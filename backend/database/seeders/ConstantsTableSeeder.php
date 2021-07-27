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
                'function' => 'resource',
                'value' => '0',
                'text' => '無',
                'usage' => '0|0',
            ],
            [
                'page' => 'stage',
                'function' => 'resource',
                'value' => '1',
                'text' => '微',
                'usage' => '0|20',
            ],
            [
                'page' => 'stage',
                'function' => 'resource',
                'value' => '2',
                'text' => '少',
                'usage' => '20|40',
            ],
            [
                'page' => 'stage',
                'function' => 'resource',
                'value' => '3',
                'text' => '普',
                'usage' => '40|60',
            ],
            [
                'page' => 'stage',
                'function' => 'resource',
                'value' => '4',
                'text' => '多',
                'usage' => '60|80',
            ],
            [
                'page' => 'stage',
                'function' => 'resource',
                'value' => '5',
                'text' => '豐',
                'usage' => '80|100',
            ],
            [
                'page' => 'member',
                'function' => 'experience',
                'value' => '0',
                'text' => '1|10',
                'usage' => '5',
            ],
            [
                'page' => 'member',
                'function' => 'experience',
                'value' => '1',
                'text' => '11|20',
                'usage' => '10',
            ],
            [
                'page' => 'member',
                'function' => 'experience',
                'value' => '2',
                'text' => '21',
                'usage' => '20',
            ]
        ];
        foreach($insertDatas as $data){
            \DB::table('constants')->insert($data);
        }
    }
}
