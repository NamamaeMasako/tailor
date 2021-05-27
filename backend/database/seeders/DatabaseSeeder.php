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

        // \App\Models\User::factory(10)->create();
        for ( $i=0 ; $i<5 ; $i++ ) {
            \App\Models\Character::factory()->create();
            sleep(1);
        }
        for ( $i=0 ; $i<10 ; $i++ ) {
            \App\Models\Job::factory()->create();
            sleep(1);
        }
    }
}
