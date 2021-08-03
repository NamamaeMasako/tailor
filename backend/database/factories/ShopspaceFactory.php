<?php

namespace Database\Factories;

use App\Models\Shopspace;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

class ShopspaceFactory extends Factory
{
    /**
     * The name of the factory's corresponding model.
     *
     * @var string
     */
    protected $model = Shopspace::class;

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
        ];
    }

}
