import numpy as np
from sklearn.neighbors import KNeighborsClassifier

class PNN:
    def __init__(self):
        self.model = KNeighborsClassifier(n_neighbors=3)

    def fit(self, features, labels):
        self.model.fit(features, labels)

    def predict(self, feature):
        return self.model.predict([feature])[0]