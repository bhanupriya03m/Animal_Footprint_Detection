import torch
from torchvision import transforms
from PIL import Image
import numpy as np
from fastapi import FastAPI, File, UploadFile
from cnn import create_cnn
from pnn import PNN
# app = FastAPI()
from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000"],  # Replace with frontend URL
    allow_credentials=True,
    allow_methods=["*"],  # Allow all methods (GET, POST, PUT, DELETE)
    allow_headers=["*"],  # Allow all headers
)

@app.get("/")
def home():
    return {"message": "CORS is enabled!"}

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# ✅ Allow safe unpickling for NumPy
torch.serialization.add_safe_globals([np.core.multiarray._reconstruct])

# ✅ Load saved model checkpoint (include features & labels)
checkpoint = torch.load("cnn_pnn_model.pth", map_location=device, weights_only=False)

# ✅ Load CNN in Feature Extraction Mode
num_classes = len(checkpoint.get('class_names', []))
cnn = create_cnn(num_classes, feature_extraction=True).to(device)
cnn.load_state_dict(checkpoint['cnn'])
cnn.eval()

# ✅ Load PNN Features and Labels
features = np.array(checkpoint['features'])
labels = np.array(checkpoint['labels'])
class_names = checkpoint['class_names']

# ✅ Initialize and train PNN
pnn = PNN()
pnn.fit(features, labels)

# ✅ Image Preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

@app.post("/predict")
async def predict_image(file: UploadFile = File(...)):
    try:
        image = Image.open(file.file).convert("RGB")
        image = transform(image).unsqueeze(0).to(device)

        # ✅ Extract CNN Features
        with torch.no_grad():
            feature = cnn(image).cpu().numpy().flatten()
        
        # ✅ Predict with PNN
        label_idx = pnn.predict(feature)
        predicted_class = class_names[label_idx]

        return {"predicted_class": predicted_class}

    except Exception as e:
        return {"error": str(e)}
