from django.urls import path

from . import event, medication, medication_history, result, user

urlpatterns = [
    path("users", user.get),
    path("user/<str:user_id>", user.get_by_id),
    path("medication/<str:user_id>", medication.get),
    path("medication/create", medication.create),
    path("medication/delete/<str:medication_id>", medication.delete),
    path("medication-history/<str:medication_id>", medication_history.get),
    path(
        "medication-history/patient/<str:patient_id>",
        medication_history.get_for_patient,
    ),
    path("medication-history/create/<str:medication_id>", medication_history.create),
    path("events", event.get),
    path("events/patient/<str:user_id>", event.get_by_patient),
    path("event/join", event.join),
    path("results/<str:user_id>", result.get),
]
