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
    'url' => [
        'rules' => [
            'store' => [
                'title' => 'required',
                'mother_path' => 'required',
                'path' => 'required'
            ]
        ]
    ]

];