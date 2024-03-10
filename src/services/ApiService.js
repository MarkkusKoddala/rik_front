import axios from 'axios';


const BASE_URL = 'http://localhost:5000/api'
class ApiService {
    constructor() {
        this.apiClient = axios.create({
            baseURL: BASE_URL,
        });
    }
    getCompanies(formdata) {
        return this.apiClient.get('/search', {params: formdata})
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching companies', error);
                throw error;
            });
    }

    getCompanyData(registerCode) {
        return this.apiClient.get('/company_data', { params: {registerCode: registerCode}})
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching company data', error);
                throw error;
            });
    }

    getPersons() {
        return this.apiClient.get('/persons')
            .then(response => response.data)
            .catch(error => {
                console.error('Error fetching persons', error);
                throw error;
            });
    }

    addCompany(companyData) {
        return this.apiClient.post('/add_company', companyData)
            .then(response => response.data)
            .catch(error => {
                console.error('Error adding company', error);
                throw error;
            });
    }

    updateShareholders(updatedShareholders){
        return this.apiClient.post('/edit_shareholders', updatedShareholders)
            .then(response => response.data)
            .catch(error => {
                console.error('Error editing companys shareholders', error);
                throw error;
            });
    }

    // You can add more methods as needed for other operations
}

const apiService = new ApiService();
export default apiService;
