<template>
    <section class="vh-100" style="background-color: #508bfc;">
        <div class="container py-5 h-100">
            <div class="row d-flex justify-content-center align-items-center h-100">
                <div class="col-12 col-md-8 col-lg-6 col-xl-5">
                    <div class="card shadow-2-strong" style="border-radius: 1rem;">
                        <div class="card-body p-5 text-center">
                            <h3 class="mb-5">Sign in</h3>
                            <div class="form-outline mb-4">
                                <input v-model="email" type="email" class="form-control form-control-lg" />
                                <label class="form-label" for="typeEmailX-2">Email</label>
                            </div>
                            <div class="form-outline mb-4">
                                <input v-model="password" type="password" class="form-control form-control-lg" />
                                <label class="form-label" for="typePasswordX-2">Password</label>
                            </div>
                                <button @click="login()" class="btn btn-primary btn-lg"  :disabled="canLogin()">Ingresar</button>
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
            email: 'Prueba',
            password: ''
        }
    },
    methods: {
       canLogin() {
           console.log(this.email, this.password);
           return  this.password.length < 4 || !this.email
           
        },
        login() {
            this.$router.push('/employee')
        }
    }
}
</script>