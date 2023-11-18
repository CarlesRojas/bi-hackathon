from typing import Dict, Any

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import Medication


@require_http_methods(["GET"])
def get(request: HttpRequest, user_id: str) -> JsonResponse:
    medications = Medication.objects.filter(Q(patient__id=user_id))
    return JsonResponse(list(map(serialize, medications)), safe=False)


@require_http_methods(["POST"])
def create(request: HttpRequest) -> JsonResponse:
    Medication(patient_id=request.POST.get("patient_id"), name=request.POST.get("name"), hour=request.POST.get("hour")).save()
    return JsonResponse({"status": "ok"})


@require_http_methods(["GET"])
def delete(request: HttpRequest, medication_id: str) -> JsonResponse:
    medication = Medication.objects.get(id=medication_id)
    medication.delete()
    return JsonResponse({"status": "ok"})


def serialize(medication: Medication) -> Dict[str, Any]:
    return {
        "id": medication.id,
        "name": medication.name,
        "hour": medication.hour,
        "created_at": medication.created_at,
    }
