<?php

namespace Database\Factories;

use App\Models\Furnishing;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class FurnishingFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Furnishing::class;

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
            'space' => 0
        ];
    }

}
