<?php
return [
    'area' => [
        'rules' => [
            'store' => [
                'title' => 'required',
                'order' => 'required|integer'
            ]
        ]
    ],
    'character' => [
        'rules' => [
            'store' => [
                'name' => 'required',
                'gender' => 'required'
            ]
        ]
    ],
    'job' => [
        'rules' => [
            'store' => [
                'title' => 'required'
            ]
        ]
    ],
    'member' => [
        'rules' => [
            'store' => [
                'name' => 'required',
                'email' => 'required|email|unique:members',
                'password' => 'required'
            ],
            'edit' => [
                'name' => 'required'
            ]
        ]
    ],
    'stage'=> [
        'rules' => [
            'store' => [
                'title' => 'required',
                'order' => 'required|integer'
            ],
            'edit' => [
                'title' => 'required',
                'order' => 'required|integer',
                'time' => 'required'
            ]
        ]
    ],
    'url' => [
        'rules' => [
            'store' => [
                'title' => 'required',
                'mother_path' => 'required',
                'path' => 'required'
            ]
        ]
    ],
    'user' => [
        'rules' => [
            'login' => [
                'email' => 'required|email',
                'password' => 'required_without:access_token',
                'access_token' => 'required_without:password'
            ],
            'register' => [
                'name' => 'required',
                'email' => 'required|email',
                'password' => 'required',
                'password_confirm' => 'required|same:password'
            ],
            'logout' => [
                'email' => 'required|email'
            ],
            'edit' => [
                'email' => 'required|email',
                'name' => 'required',
                'origin_password' => 'required_with:new_password',
                'new_password_chk' => 'required_with:new_password|same:new_password'
            ],
        ]
    ]
];