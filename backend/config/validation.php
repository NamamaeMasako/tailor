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
                'gender' => 'required',
                'enable' => 'required',
            ]
        ]
    ],
    'constant' => [
        'rules' => [
            'edit' => [
                'value' => 'required',
                'text' => 'required',
                'usage' => 'required'
            ]
        ]
    ],
    'costume' => [
        'rules' => [
            'store' => [
                'title' => 'required',
                'gender' => 'required',
                'part' => 'required',
                'bug' => 'required|integer|min:0',
                'feather' => 'required|integer|min:0',
                'cannabis' => 'required|integer|min:0',
                'gem' => 'required|integer|min:0',
                'stamina' => 'required|integer|min:0',
                'quantity' => 'required|integer|min:0',
                'time' => 'required',
                'experience' => 'required|integer|min:0',
                'price' => 'required|integer|min:0',
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
            'dowork' => [
                'count' => 'min:0'
            ],
            'edit' => [
                'name' => 'required',
                'bug' => 'required',
                'feather' => 'required',
                'cannabis' => 'required',
                'gem' => 'required'
            ],
            'updatestage' => [
                'character_no' => 'required'
            ],
            'addcostume' => [
                'costume_no' => 'required',
                'amount' => 'required|integer|max:0'
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
            'resetpassword' => [
                'email' => 'required|email',
                'name' => 'required'
            ]
        ]
    ]
];