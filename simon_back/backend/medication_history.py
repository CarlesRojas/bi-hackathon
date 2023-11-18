from typing import Dict, Any

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import MedicationHistory


@require_http_methods(["GET"])
def get(request: HttpRequest) -> JsonResponse:
    medication_history = MedicationHistory.objects.filter(Q(medication_id=request.GET.get("medication_id")))
    return JsonResponse(list(map(serialize, medication_history)), safe=False)


@require_http_methods(["POST"])
def create(request: HttpRequest) -> JsonResponse:
    MedicationHistory(medication_id=request.POST.get("medication_id"), taken=request.POST.get("taken")).save()
    return JsonResponse({"status": "ok"})


def serialize(medication_history: MedicationHistory) -> Dict[str, Any]:
    return {
        "id": medication_history.id,
        "taken": medication_history.taken,
        "created_at": medication_history.created_at,
    }
