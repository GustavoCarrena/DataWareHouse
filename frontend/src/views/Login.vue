<template>
<section class="vh-100" style="background-color: #508bfc;">
    <div class="container py-5 h-100 w-100">
        <div class="row d-flex justify-content-center align-items-center h-100">
            <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                <div class="card shadow-2-strong" style="border-radius: 1rem;">
                    <div class="card-body p-5 text-center">
                        <h3 class="mb-5">Ingreso de Usuarios</h3>
                        <form action="form">
                            <div class="form-outline mb-4">
                                <label class="form-label" for="typeEmailX-2">Email</label>
                                <input v-model="email" type="email" class="form-control form-control-lg" />
                            </div>
                            <div class="form-outline mb-4">
                                <label class="form-label" for="typePasswordX-2">Password</label>
                                <input v-model="password" type="password" name="typePasswordX-2" autocomplete="on" class="form-control form-control-lg" />
                                
                            </div>
                        </form>
                        <button @click="login()" class="btn btn-primary btn-lg" :disabled="loginSubmit()">Ingresar</button>

                    </div>
                </div>
            </div>
        </div>
    </div>
</section>
</template>

<script>
export default {
    name: 'Login',
    data() {
        return {
            employees: '',
            email: '',
            password: ''
        }
    },
    methods: {

        loginSubmit() {
            return !this.password || !this.email;
        },

        async login() {
            const credentials = await (await this.getCredentials()).userData.status
           if (credentials === 200) {
                this.$router.push('/contacts');
                credentials;
                this.email = '';
                this.password = '';

            } else {
                this.$alertify.error('Email o Password Incorrectos');
            }

        },

        async getEmployees() {
            const url = "http://localhost:3000/employees/employeesData";
            try {
                const response = await fetch(url);
                const data = await response.json();
                this.employees = data.response
                return this.employees
            } catch (error) {
                error
            }
        },

        async getCredentials() {
            try {
                const url = `http://localhost:3000/employees/employeesLogin`;

                let payload = {
                    email: this.email,
                    user_pass: this.password,
                };

                const response = await fetch(url, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json",
                    },
                });
                const userData = await response.json();
                const token = userData.response.token
                localStorage.setItem('token',token) 
                const role_id = userData.response.roleId;
                localStorage.setItem('role',role_id)
                return {
                    userData
                }
            } catch (error) {
                error
            }

        }

    }
}
</script>


