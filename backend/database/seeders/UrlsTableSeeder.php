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
                'path' => '/game',
                'title' => '遊戲管理',
            ],
            [
                'path' => '/member',
                'title' => '會員',
            ],
            [
                'path' => '/system',
                'title' => '後臺設定',
            ],
            [
                'path' => '/character/list',
                'title' => '角色',
                'mother_path' => '/game'
            ],
            [
                'path' => '/job/list',
                'title' => '職業',
                'mother_path' => '/game'
            ],
            [
                'path' => '/area/list',
                'title' => '區域',
                'mother_path' => '/game'
            ],
            [
                'path' => '/list',
                'title' => '列表',
                'mother_path' => '/member'
            ],
            [
                'path' => '/manerger/list',
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
