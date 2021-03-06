<!DOCTYPE html>
<html lang="{{env('APP_LANG')}}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width",initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{env('APP_NAME')}}</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet">
    </head>
    <body>
        <div id="app"></div>
    </body>
    <script src="{{asset('js/app.js')}}"></script>
    <script>
        localStorage.setItem('HOST', "{{env('APP_URL')}}");
    </script>
</html>