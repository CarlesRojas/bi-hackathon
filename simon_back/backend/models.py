import uuid

from django.db import models


class User(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    is_doctor = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "user"


class Medication(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    patient = models.ForeignKey(
        User, on_delete=models.DO_NOTHING
    )
    name = models.CharField(max_length=255)
    hour = models.TimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "medication"


class MedicationHistory(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    medication = models.ForeignKey(
        Medication, on_delete=models.DO_NOTHING
    )
    taken = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "medication_history"


class Event(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    name = models.CharField(max_length=255)
    organizer = models.CharField(max_length=255)
    type = models.CharField(max_length=25)
    start_date = models.DateTimeField()
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "event"


class EventAssistance(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    event = models.ForeignKey(
        Event, on_delete=models.DO_NOTHING
    )
    user = models.ForeignKey(
        User, on_delete=models.DO_NOTHING
    )
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        db_table = "event_assistance"
