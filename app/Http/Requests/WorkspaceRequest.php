<?php

namespace App\Http\Requests;

use App\Enums\WorkspaceVisibility;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;
use Illuminate\Validation\Rules\Enum;

class WorkspaceRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'name' => 'required|string|max:255',
            'cover' => [
                Rule::when($this->routeIs('workspaces.store'), [
                    'required',
                    'mimes:jpg,jpeg,png',
                    'max:2048', // 2MB
                ]),
                Rule::when($this->routeIs('workspaces.update'), [
                    'nullable',
                    'mimes:jpg,jpeg,png',
                    'max:2048', // 2MB
                ]),
            ],
            'logo' => [
                Rule::when($this->routeIs('workspaces.store'), [
                    'required',
                    'mimes:jpg,jpeg,png',
                    'max:2048', // 2MB
                ]),
                Rule::when($this->routeIs('workspaces.update'), [
                    'nullable',
                    'mimes:jpg,jpeg,png',
                    'max:2048', // 2MB
                ]),
            ],
            'visibility' => [
                'required',
                new Enum(WorkspaceVisibility::class),
            ],
        ];
    }

    public function attributes():array
    {
        return [
            'name' => 'Name',
            'cover' => 'Cover',
            'logo' => 'Logo',
            'visibility' => 'Visibility',
        ];
    }
}
