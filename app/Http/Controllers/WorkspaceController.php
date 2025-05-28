<?php

namespace App\Http\Controllers;

use App\Enums\WorkspaceVisibility;
use App\Http\Requests\WorkspaceRequest;
use App\Http\Resources\WorkspaceResource;
use App\Models\Workspace;
use App\Traits\HasFile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Response;

class WorkspaceController extends Controller
{
    use HasFile;
    public function create() :Response
    {
        return inertia(component: 'Workspaces/Create', props: [
            'page_settings' => [
                'title' => 'Create Workspace',
                'subtitle' => 'Fill in the form below to create a new workspace.',
                'method' => 'POST',
                'action' => route('workspaces.store'),
            ],
            'visibilities' => WorkspaceVisibility::options(),
        ]);
    }

    public function store(WorkspaceRequest $request): RedirectResponse
    {
        $workspace = $request->user()->workspaces()->create([
            'name' => $name = $request->name,
            'slug' => str()->slug($name . '-' . Str::uuid()),
            'cover' => $this->upload_file($request, 'cover', 'workspaces/cover'),
            'logo' => $this->upload_file($request, 'logo', 'workspaces/logo'),
            'visibility' => $request->visibility,
        ]);

        flashMessage('Workspace created successfully!', 'success');

        return to_route('workspaces.show', $workspace);
    }

    public function show(Workspace $workspace): Response
    {
        return inertia(component: 'Workspaces/Show' , props: [
            'workspace' => fn()=> new WorkspaceResource($workspace)
        ]);
    }
}
