import torch
from torchvision import datasets, transforms
from torch.utils.data import DataLoader
import numpy as np
from sklearn.metrics import classification_report, accuracy_score

from cnn import create_cnn
from pnn import PNN

device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

# 🛠 Fix for torch.load with safe globals
torch.serialization.add_safe_globals([np.core.multiarray._reconstruct])

# Load saved model checkpoint
checkpoint = torch.load("hybrid.pth", map_location=device, weights_only=False)

# Load class names and features
class_names = checkpoint.get('class_names', [])
features = np.array(checkpoint.get('features', []))
labels = np.array(checkpoint.get('labels', []))

if len(class_names) == 0 or features.size == 0 or labels.size == 0:
    raise ValueError("Error loading class names, features, or labels from checkpoint!")

print(f"Loaded {len(class_names)} class names: {class_names}")

# Load CNN in feature extraction mode
cnn = create_cnn(len(class_names), feature_extraction=True).to(device)
cnn.load_state_dict(torch.load("hybrid_cnn_model.pth", map_location=device), strict=False)
cnn.eval()

# Initialize PNN and load features
pnn = PNN()
pnn.fit(features, labels)

# Image preprocessing
transform = transforms.Compose([
    transforms.Resize((224, 224)),
    transforms.ToTensor()
])

# Load testing dataset
test_dir = r"animal-footprint-detection\dataset\OpenAnimalTracks\cropped_imgs\test"
test_dataset = datasets.ImageFolder(root=test_dir, transform=transform)
test_loader = DataLoader(test_dataset, batch_size=1, shuffle=False)

# Testing loop
y_pred_test = []
y_true_test = []

print("\n🔍 Validating on Testing Set...")
for images, labels in test_loader:
    images, labels = images.to(device), labels.to(device)

    # Extract CNN features
    with torch.no_grad():
        feature = cnn(images).cpu().numpy().flatten()
    
    # Predict with PNN
    predicted_label = pnn.predict(feature)

    # Collect predictions and true labels
    y_pred_test.append(predicted_label)
    y_true_test.append(labels.item())

# Accuracy and classification report for testing data
accuracy_test = accuracy_score(y_true_test, y_pred_test)
print(f"\n✅ Testing Accuracy: {accuracy_test * 100:.2f}%")

print("\n📊 Testing Classification Report:")
print(classification_report(y_true_test, y_pred_test, target_names=class_names))
