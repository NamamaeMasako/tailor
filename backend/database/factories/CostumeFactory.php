<?php

namespace Database\Factories;

use App\Models\Costume;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class CostumeFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Costume::class;

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
            'gender' => 0,
            'part' => rand(0,9),
            'bug' => rand(1,10),
            'feather' => rand(1,10),
            'cannabis' => rand(1,10),
            'gem' => rand(1,10),
            'stamina' => rand(1,5),
            'amount' => rand(1,10),
            'time' => $this->faker->time($format = 'H:i:s'),
            'experience' => rand(1,5),
            'price' => rand(1,10),
            'enable' => 0,
        ];
    }

}
