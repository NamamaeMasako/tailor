<?php

namespace Database\Factories;

use App\Models\Stage;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class StageFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Stage::class;

    /**
     * Define the model's default state.
     * 
     * faker rules: https://github.com/fzaninotto/Faker
     *
     * @return array
     */
    public function definition()
    {
        return [
            'title' => $this->faker->word(),
            'order' => 0,
            'time' => $this->faker->time($format = 'H:i:s'),
            'enable' => rand(0,1),
            'bug_value' => rand(0,5),
            'feather_value' => rand(0,5),
            'cannabis_value' => rand(0,5),
            'gem_value' => rand(0,5),
            'coins' => rand(0,100),
        ];
    }

}
