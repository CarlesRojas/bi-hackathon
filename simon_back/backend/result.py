from typing import Dict, Any

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import Medication


@require_http_methods(["GET"])
def get(request: HttpRequest) -> JsonResponse:
    medications = Medication.objects.filter(Q(patient__id=request.GET.get("user_id")))
    return JsonResponse(list(map(serialize, medications)), safe=False)


def serialize(medication: Medication) -> Dict[str, Any]:
    return {
        "name": medication.name,
        "hour": medication.hour,
        "created_at": medication.created_at,
    }
