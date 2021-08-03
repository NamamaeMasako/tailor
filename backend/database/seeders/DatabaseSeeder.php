<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    /**
     * Seed the application's database.
     *
     * @return void
     */
    public function run()
    {
        $this->call(UrlsTableSeeder::class);
        $this->call(ConstantsTableSeeder::class);

        // \App\Models\User::factory(10)->create();
        for ( $i=0 ; $i<5 ; $i++ ) {
            \App\Models\Area::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<5 ; $i++ ) {
            \App\Models\Character::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<10 ; $i++ ) {
            \App\Models\Job::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<1 ; $i++ ) {
            \App\Models\Member::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<4 ; $i++ ) {
            \App\Models\Stage::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<2 ; $i++ ) {
            \App\Models\Costume::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<5 ; $i++ ) {
            \App\Models\Furnishing::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<5 ; $i++ ) {
            \App\Models\Shopspace::factory()->create();
            sleep(1);
        }
    }
}
