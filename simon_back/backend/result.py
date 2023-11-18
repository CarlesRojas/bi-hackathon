from datetime import datetime, timedelta, date

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.enums import EventType
from backend.models import Medication, EventAssistance, Event, MedicationHistory


@require_http_methods(["GET"])
def get(request: HttpRequest, user_id: str) -> JsonResponse:
    today_day_of_week = datetime.now().isoweekday()
    first_day_of_week = date.today() - timedelta(days=today_day_of_week)
    medication_days = Medication.objects.filter(Q(patient__id=user_id)).count()*7
    medication_taken = MedicationHistory.objects.filter(Q(medication__patient__id=user_id), Q(created_at__gt=first_day_of_week)).count()
    events_assisted = Event.objects.filter(Q(id__in=EventAssistance.objects.values_list('event', flat=True)
                                           .filter(Q(user__id=user_id))), Q(type=EventType.SOCIAL_EVENT.value), Q(start_date__gt=first_day_of_week), Q(start_date__lte=datetime.now())).count()
    appointments_assisted = Event.objects.filter(Q(id__in=EventAssistance.objects.values_list('event', flat=True)
                                                 .filter(Q(user__id=user_id))), Q(type=EventType.MEDICAL_APPOINTMENT.value), Q(start_date__gt=first_day_of_week), Q(start_date__lte=datetime.now())).count()
    return JsonResponse({
        "medication_times": medication_days,
        "medication_taken": medication_taken,
        "events_assisted": events_assisted,
        "appointments_assisted": appointments_assisted,
    })
