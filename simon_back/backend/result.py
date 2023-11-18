from typing import Dict, Any

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import Medication


@require_http_methods(["GET"])
def get(request: HttpRequest, user_id: str) -> JsonResponse:
    medications = Medication.objects.filter(Q(patient__id=user_id))
    return JsonResponse(list(map(serialize, medications)), safe=False)


def serialize(medication: Medication) -> Dict[str, Any]:
    return {
        "medication_days": medication.name,
        "medication_taken": medication.hour,
        "events_assisted": medication.created_at,
        "appointments_assisted": medication.created_at,
    }
