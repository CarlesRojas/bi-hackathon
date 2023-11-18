from django.contrib import admin
from django.urls import path
from . import user, medication, medication_history

urlpatterns = [
    path("users", user.get),
    path("medication", medication.get),
    path("medication/create", medication.create),
    path("medication/delete", medication.delete),
    path("medication-history", medication_history.get),
    path("medication-history/create", medication_history.create)
]
