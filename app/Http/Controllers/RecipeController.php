<?php

namespace App\Http\Controllers;

use App\Recipe;
use Illuminate\Http\Request;
use GuzzleHttp\Client as GuzzleHttpClient;
use GuzzleHttp\Promise;
use Psr\Http\Message\ResponseInterface;
use GuzzleHttp\Exception\RequestException;

class RecipeController extends Controller
{
    private $yummly;
    
    public function __construct() {
        $this->middleware('auth:api');
        $this->yummly = new GuzzleHttpClient([
            'base_uri' => 'https://api.yummly.com/v1/api/',
            'headers'  => [
                'Accept' => 'application/json',
                'Content-Type' => 'application/json',
                'Accept-Encoding' => 'gzip',
                'X-Yummly-App-ID' => env('YUMMLY_APP_ID'),
                'X-Yummly-App-Key' => env('YUMMLY_APP_KEY'),
            ],
        ]);
    }

    /**
     * Display a listing of the resource.
     *
     * @return \Illuminate\Http\Response
     */
    public function index()
    {
        $promise = $this->yummly->getAsync('recipes?q=pasta')->then(
            function(ResponseInterface $response) {
               return json_decode((string) $response->getBody()->getContents(), true);
            },
            function(RequestException $exception) {
                return json_decode((string) $exception->getBody()->getContents(), true);
            }
        );

        $response = $promise->wait();

        return response([
            'status' => 'success',
            'data' => $response
        ]);
    }

    /**
     * Display the specified resource.
     *
     * @param  \App\Recipe  $recipe
     * @return \Illuminate\Http\Response
     */
    public function show(Request $request, $id)
    {
        $promise = $this->yummly->getAsync('recipe/' . $id)->then(
            function(ResponseInterface $response) {
               return json_decode((string) $response->getBody()->getContents(), true);
            },
            function(RequestException $exception) {
                return json_decode((string) $exception->getBody()->getContents(), true);
            }
        );

        $response = $promise->wait();

        return response([
            'status' => 'success',
            'data' => $response
        ]);
    }
}
