<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class UrlsTableSeeder extends Seeder
{
    /**
     * Run the database seeds.
     *
     * @return void
     */
    public function run()
    {
        $insertDatas = [
            [
                'path' => '/character',
                'title' => '角色',
            ],
            [
                'path' => '/system',
                'title' => '系統',
            ],
            [
                'path' => '/list',
                'title' => '人物',
                'mother_path' => '/character'
            ],
            [
                'path' => '/job/list',
                'title' => '職業',
                'mother_path' => '/character'
            ],
            [
                'path' => '/list',
                'title' => '管理員',
                'mother_path' => '/system'
            ],
            [
                'path' => '/url/list',
                'title' => '頁面連結',
                'mother_path' => '/system'
            ],
        ];
        foreach($insertDatas as $data){
            \DB::table('urls')->insert($data);
        }
    }
}
