<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class ConstantsTableSeeder extends Seeder
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
                'page' => 'stage',
                'function' => 'resource-list',
                'value' => '0',
                'text' => '無',
                'description' => '獲得資源數量下拉清單'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-list',
                'value' => '1',
                'text' => '微',
                'description' => '獲得資源數量下拉清單'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-list',
                'value' => '2',
                'text' => '少',
                'description' => '獲得資源數量下拉清單'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-list',
                'value' => '3',
                'text' => '普',
                'description' => '獲得資源數量下拉清單'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-list',
                'value' => '4',
                'text' => '多',
                'description' => '獲得資源數量下拉清單'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-list',
                'value' => '5',
                'text' => '豐',
                'description' => '獲得資源數量下拉清單'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-amount',
                'value' => '0',
                'text' => '0',
                'description' => '獲得資源數量下拉清單對應實際數量'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-amount',
                'value' => '1',
                'text' => '0|20',
                'description' => '獲得資源數量下拉清單對應實際數量'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-amount',
                'value' => '2',
                'text' => '20|40',
                'description' => '獲得資源數量下拉清單對應實際數量'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-amount',
                'value' => '3',
                'text' => '40|60',
                'description' => '獲得資源數量下拉清單對應實際數量'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-amount',
                'value' => '4',
                'text' => '60|80',
                'description' => '獲得資源數量下拉清單對應實際數量'
            ],
            [
                'page' => 'stage',
                'function' => 'resource-amount',
                'value' => '5',
                'text' => '80|100',
                'description' => '獲得資源數量下拉清單對應實際數量'
            ],
        ];
        foreach($insertDatas as $data){
            \DB::table('constants')->insert($data);
        }
    }
}
