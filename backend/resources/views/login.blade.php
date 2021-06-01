<!DOCTYPE html>
<html lang="{{env('APP_LANG')}}">
    <head>
        <meta charset="utf-8">
        <meta name="viewport" content="width=device-width",initial-scale=1">
        <meta name="csrf-token" content="{{ csrf_token() }}">
        <title>{{env('APP_NAME')}}</title>
        <link href="{{asset('css/app.css')}}" rel="stylesheet">
    </head>
    <body class="auth">
        <div class="jumbotron d-flex justify-content-center align-items-center h-100">
            <div class="col-6">
                <div class="card">
                    <div class="card-header text-center h4">
                        管理後台登入
                    </div>
                    <div class="card-body">
                        <div class="form-group row">
                            <label for="email" class="col-2 col-from-label">電子信箱</label>
                            <div class="col-10">
                                <input type="text" class="form-control" id="email">
                            </div>
                        </div>
                        <div class="form-group row">
                            <label for="password" class="col-2 col-from-label">密碼</label>
                            <div class="col-10">
                                <input type="password" class="form-control" id="password">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer row">
                        <div class="col-6">
                            <button class="btn btn-block btn-success">登入</button>
                        </div>
                        <div class="col-6">
                            <a href="/register" class="btn btn-block btn-info text-light">註冊</a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </body>
    {{-- <script src="{{asset('js/app.js')}}"></script> --}}
    <script>
        localStorage.setItem('HOST', "{{env('APP_URL')}}");
    </script>
</html>