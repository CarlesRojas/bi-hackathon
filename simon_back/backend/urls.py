from django.urls import path
from . import user, medication, medication_history, event, result

urlpatterns = [
    path("users", user.get),
    path("user<str:user_id>", user.get_by_id),
    path("medication", medication.get),
    path("medication/create", medication.create),
    path("medication/delete", medication.delete),
    path("medication-history", medication_history.get),
    path("medication-history/create", medication_history.create),
    path("events", event.get),
    path("events/patient", event.get_by_patient),
    path("event/join", event.join),
    path("results", result.get)
]
