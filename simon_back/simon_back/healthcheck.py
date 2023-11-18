from django.http import HttpResponse, HttpRequest, JsonResponse
from django.views.decorators.http import require_http_methods


@require_http_methods(["GET"])
def healthcheck(request: HttpRequest) -> HttpResponse:
    return JsonResponse({"status": "ok"})
