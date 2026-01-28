<?php

namespace Tests\Feature;

use Tests\TestCase;
use App\Models\User;

class DomainRoutingTest extends TestCase
{
    /**
     * Test Main Domain Access
     */
    public function test_main_domain_loads_correct_view()
    {
        $response = $this->get('http://thedarkandbright.com');
        $response->assertStatus(200);
        $response->assertViewIs('index');
    }

    /**
     * Test LPK Domain Access
     */
    public function test_lpk_domain_loads_correct_view()
    {
        $response = $this->get('http://lpk.thedarkandbright.com');
        $response->assertStatus(200);
        $response->assertViewIs('lpk.home');
    }

    /**
     * Test Admin Domain Access (Protected)
     */
    public function test_admin_domain_redirects_unauthenticated()
    {
        $response = $this->get('http://admin.thedarkandbright.com');
        // Should redirect to login because of auth middleware
        $response->assertStatus(302); 
    }
}
