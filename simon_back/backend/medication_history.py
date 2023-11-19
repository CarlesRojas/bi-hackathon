from datetime import datetime
from typing import Any, Dict

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import MedicationHistory


@require_http_methods(["GET"])
def get(request: HttpRequest, medication_id: str) -> JsonResponse:
    medication_history = MedicationHistory.objects.filter(
        Q(medication_id=medication_id)
    )
    return JsonResponse(list(map(serialize, medication_history)), safe=False)


@require_http_methods(["GET"])
def get_for_patient(request: HttpRequest, patient_id: str) -> JsonResponse:
    medication_history = MedicationHistory.objects.filter(
        Q(medication__patient_id=patient_id),
        Q(
            created_at__gte=datetime.now().replace(
                hour=0, minute=0, second=0, microsecond=0
            )
        ),
        Q(
            created_at__lte=datetime.now().replace(
                hour=23, minute=59, second=59, microsecond=0
            )
        ),
    )

    return JsonResponse(list(map(serialize, medication_history)), safe=False)


@require_http_methods(["GET"])
def create(request: HttpRequest, medication_id: str) -> JsonResponse:
    MedicationHistory(medication_id=medication_id).save()
    return JsonResponse({"status": "ok"})


def serialize(medication_history: MedicationHistory) -> Dict[str, Any]:
    return {
        "id": medication_history.id,
        "created_at": medication_history.created_at,
        "medication_id": medication_history.medication_id,
    }
