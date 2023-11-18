from typing import Dict, Any

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import Event, EventAssistance


@require_http_methods(["GET"])
def get(request: HttpRequest) -> JsonResponse:
    events = Event.objects.all()
    return JsonResponse(list(map(serialize, events)), safe=False)


@require_http_methods(["GET"])
def get_by_patient(request: HttpRequest, user_id: str) -> JsonResponse:
    events_assistance = EventAssistance.objects.values_list('event', flat=True).filter(Q(user__id=user_id))
    events = Event.objects.filter(id__in=events_assistance)
    return JsonResponse(list(map(serialize, events)), safe=False)


@require_http_methods(["POST"])
def join(request: HttpRequest, medication_id: str) -> JsonResponse:
    EventAssistance(event_id=request.POST.get("event_id"), user_id=request.POST.get("user_id")).save()
    return JsonResponse({"status": "ok"})


def serialize(event: Event) -> Dict[str, Any]:
    return {
        "id": event.id,
        "name": event.name,
        "organizer": event.organizer,
        "type": event.type,
        "start_date": event.start_date,
        "created_at": event.created_at,
    }
