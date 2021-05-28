<?php
return [
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