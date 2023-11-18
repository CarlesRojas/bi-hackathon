from typing import Dict, Any

from django.db.models import Q
from django.http import HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods

from backend.models import User


@require_http_methods(["GET"])
def get(request: HttpRequest) -> JsonResponse:
    users = User.objects.all()
    return JsonResponse(list(map(serialize, users)), safe=False)


@require_http_methods(["GET"])
def get_by_id(request: HttpRequest) -> JsonResponse:
    user = User.objects.get(Q(id=request.GET.get("user_id")))
    return JsonResponse(list(map(serialize, user)), safe=False)


def serialize(user: User) -> Dict[str, Any]:
    return {
        "id": user.id,
        "name": user.name,
        "is_doctor": user.is_doctor,
        "created_at": user.created_at,
    }
