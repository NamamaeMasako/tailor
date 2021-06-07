<template>
<div class="row">
    <div id="login" class="jumbotron col-12 m-0">
        <h1 class="display-4 text-center">Tailor</h1>
        <p class="lead text-center">This is a simple hero unit, a simple jumbotron-style component for calling extra attention to featured content or information.</p>
        <hr class="my-4">
        <p class="text-center">It uses utility classes for typography and spacing to space content out within the larger container.</p>
        <div class="row justify-content-center">
            <div class="col-4">
                <div class="card">
                    <div class="card-body">
                        <div class="form-group">
                            <label for="name">名稱</label>
                            <input type="text" id="name" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="email">電子郵件</label>
                            <input type="email" id="email" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password">密碼</label>
                            <input type="password" id="password" class="form-control">
                        </div>
                        <div class="form-group">
                            <label for="password_confirm">再次確認密碼</label>
                            <input type="password" id="password_confirm" class="form-control">
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="row">
                            <div class="col-6">
                                <b-button variant="secondary" href="/login" class="btn-block">返回</b-button>
                            </div>
                            <div class="col-6">
                                <b-button variant="success" class="btn-block">送出</b-button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>  
</template>