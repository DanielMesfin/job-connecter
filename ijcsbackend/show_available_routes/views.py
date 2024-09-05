from django.shortcuts import render
from django.urls import get_resolver
from django.http import HttpResponse

def show_available_routes(request):
    resolver = get_resolver()
    url_patterns = []
    for pattern in resolver.url_patterns:
        pattern_str = str(pattern.pattern)
        if pattern_str.startswith('^'):
            pattern_str = pattern_str[1:]
        url_patterns.append(pattern_str)

    response = f"Available Routes:\n\n{ '\n'.join(url_patterns) }"
    return HttpResponse(response)
