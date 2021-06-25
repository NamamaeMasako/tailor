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
            'part' => 0,
            'bug' => 5,
            'feather' => 5,
            'cannabis' => 5,
            'gem' => 5,
            'stamina' => 5,
            'experience' => 1,
            'price' => 2,
            'enable' => 0,
        ];
    }

}
