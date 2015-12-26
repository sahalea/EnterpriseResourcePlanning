using Erp.BussinessLogic.Common;
using Erp.BussinessLogic.Sales;
using Erp.DataMapping.Entities;
using Newtonsoft.Json;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using System.Web.Http;

namespace Erp.Client.Controllers
{
    public class LookupsController : ApiController
    {
        private UnitsLogic _unitsLogic;
        private DeliveryTermsLogic _deliveryTermsLogic;
        private PaymentTermsLogic _paymentTermsLogic;
        private CountryLogic _countryLogic;
        private ProjectLogic _projectLogic;
        private MaterialLogic _materialLogic;
        private ProductLogic _productLogic;
        private ItemSizeLogic _itemSizeLogic;
        private MakeLogic _makeLogic;
        private GradeLogic _gradeLogic;
        private AccountTypeLogic _accountLogic;
        private PaymentMethodLogic _paymentMethodLogic;

        public LookupsController()
        {
            _unitsLogic = new UnitsLogic();
            _deliveryTermsLogic = new DeliveryTermsLogic();
            _paymentTermsLogic = new PaymentTermsLogic();
            _countryLogic = new CountryLogic();
            _projectLogic = new ProjectLogic();
            _materialLogic = new MaterialLogic();
            _productLogic = new ProductLogic();
            _itemSizeLogic = new ItemSizeLogic();
            _makeLogic = new MakeLogic();
            _gradeLogic = new GradeLogic();
            _accountLogic = new AccountTypeLogic();
            _paymentMethodLogic = new PaymentMethodLogic();

        }

        //Units

        [Route("api/units")]
        [HttpGet]
        public Object GetUnits()
        {

            List<Units> list = _unitsLogic.GetUnits();

            return new
            {
                success = true,
                Units = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/units/query")]
        [HttpGet]
        public Object GetUnitsPagedWithQuery(string query)
        {
            List<Units> list = _unitsLogic.GetUnitFiltered(query);
            return new
            {
                success = true,
                Units = new { Record = list, TotalRecords = list.Count }
            };
        }
        [Route("api/units/save")]
        [HttpPost]
        public object SaveUnits(dynamic data)
        {
            var units = JsonConvert.DeserializeObject<Units>(data.ToString());

            _unitsLogic.AddorUpdate(units);

            return new
            {
                success = true,
                Units = new { Record = units, TotalRecords = 1 }
            };
        }

        //DeliveryTerms

        [Route("api/deliveryTerms")]
        [HttpGet]
        public Object GetDeliveryTerms()
        {

            List<DeliveryTerms> list = _deliveryTermsLogic.GetDeliveryTerms();

            return new
            {
                success = true,
                DeliveryTerms = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/deliveryTerms/save")]
        [HttpPost]
        public object SaveDeliveryTerms(dynamic data)
        {
            var deliveryTerms = JsonConvert.DeserializeObject<DeliveryTerms>(data.ToString());

            _deliveryTermsLogic.AddorUpdate(deliveryTerms);

            return new
            {
                success = true,
                DeliveryTerms = new { Record = deliveryTerms, TotalRecords = 1 }
            };
        }

        //PaymentTerms

        [Route("api/paymentterms")]
        [HttpGet]
        public Object GetPaymentTerms()
        {

            List<PaymentTerms> list = _paymentTermsLogic.GetPaymentTerms();
            return new
            {
                success = true,
                PaymentTerms = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/paymentterms/query")]
        [HttpGet]
        public Object GetPaymentTermsPagedWithQuery(string query)
        {
            List<PaymentTerms> list = _paymentTermsLogic.GetPaymentFiltered(query);
            return new
            {
                success = true,
                PaymentTerms = new { Record = list, TotalRecords = list.Count }
            };
        }


        [Route("api/paymentterms/save")]
        [HttpPost]
        public object SavePaymentTerms(dynamic data)
        {
            var paymentTerms = JsonConvert.DeserializeObject<PaymentTerms>(data.ToString());

            _paymentTermsLogic.AddorUpdate(paymentTerms);

            return new
            {
                success = true,
                PaymentTerms = new { Record = paymentTerms, TotalRecords = 1 }
            };
        }

        // country

        private Object GetCountry(String query, int start = 0, int limit = 25)
        {
            int totalCount = 0;
            List<Country> list = _countryLogic.GetCountry(query, start, limit, out totalCount);
            return new
            {
                success = true,
                Country = new { Record = list, TotalRecords = totalCount }
            };
        }

        [Route("api/country")]
        [HttpGet]
        public Object Country(String query, int start = 0, int limit = 25)
        {
            return GetCountry(query, 0, 25);
        }
        [Route("api/country")]
        [HttpGet]
        public Object Country()
        {
            return GetCountry("", 0, 25);
        }

        // projects

        [Route("api/project")]
        [HttpGet]
        public Object GetProjects()
        {
            List<Projects> list = _projectLogic.GetProjects();

            return new
            {
                success = true,
                Projects = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/project/query")]
        [HttpGet]
        public Object GetProjectPagedWithQuery(string query, int? start, int? limit)
        {
            List<Projects> list = _projectLogic.GetProjectFiltered(query,start,limit).ToList<Projects>();
            return new
            {
                success = true,
                Projects = new { Record = list.Skip(start.Value).Take(limit.Value), TotalRecords = list.Count }
            };
        }

        [Route("api/project/{id:int}")]
        [HttpGet]

        public object GetProject(int id)
        {
            return _projectLogic.GetProjectById(id);
        }

        [Route("api/project/save")]
        [HttpPost]
        public Object SaveProjects(dynamic data)
        {
            var project = JsonConvert.DeserializeObject<Projects>(data.ToString());

            _projectLogic.AddorUpdate(project);

            return new
            {
                success = true,
                Projects = new { Record = project, TotalRecords = 1 },
            };

        }
        [Route("api/deleteproject")]
        [HttpGet]
        public void DeleteProject(int id)
        {
            _projectLogic.DeleteProject(id);
        }

        //material

        [Route("api/material")]
        [HttpGet]
        public Object GetMaterial()
        {
            List<Material> list = _materialLogic.GetMaterial();

            return new
            {
                success = true,
                Material = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/material/query")]
        [HttpGet]
        public Object GetMaterialPagedWithQuery(string query)
        {
            List<Material> list = _materialLogic.GetMaterialFiltered(query);
            return new
            {
                success = true,
                Material = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/material/query")]
        [HttpGet]
        public Object GetMaterialPagedWithQuery()
        {
            List<Material> list = _materialLogic.GetMaterialFiltered(null);
            return new
            {
                success = true,
                Material = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/material/{id:int}")]
        [HttpGet]

        public object GetMaterial(int id)
        {
            return _materialLogic.GetMaterialById(id);
        }

        [Route("api/material/save")]
        [HttpPost]
        public Object SaveMaterial(dynamic data)
        {
            var material = JsonConvert.DeserializeObject<Material>(data.ToString());

            _materialLogic.AddorUpdate(material);

            return new
            {
                success = true,
                Material = new { Record = material, TotalRecords = 1 },
            };
        }



        //product

        [Route("api/product")]
        [HttpGet]
        public Object GetProduct()
        {
            List<Product> list = _productLogic.GetProduct();

            return new
            {
                success = true,
                Product = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/product/query")]
        [HttpGet]
        public Object GetProductPagedWithQuery(string query)
        {
            List<Product> list = _productLogic.GetProductFiltered(query);
            return new
            {
                success = true,
                Product = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/product/{id:int}")]
        [HttpGet]

        public object GetProduct(int id)
        {
            return _productLogic.GetProductById(id);
        }

        [Route("api/product/save")]
        [HttpPost]
        public Object SaveProduct(dynamic data)
        {
            var product = JsonConvert.DeserializeObject<Product>(data.ToString());

            _productLogic.AddorUpdate(product);

            return new
            {
                success = true,
                Product = new { Record = product, TotalRecords = 1 },
            };
        }

        //item size

        [Route("api/itemsize")]
        [HttpGet]
        public Object GetItemSize()
        {
            List<ItemSize> list = _itemSizeLogic.GetItemSize();

            return new
            {
                success = true,
                ItemSize = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/itemsize/query")]
        [HttpGet]
        public Object GetItemSizePagedWithQuery(string query)
        {
            List<ItemSize> list = _itemSizeLogic.GetItemSizeFiltered(query);
            return new
            {
                success = true,
                ItemSize = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/itemsize/{id:int}")]
        [HttpGet]

        public object GetItemSize(int id)
        {
            return _itemSizeLogic.GetItemSizeById(id);
        }

        [Route("api/itemsize/save")]
        [HttpPost]
        public Object SaveItemSize(dynamic data)
        {
            var itemSize = JsonConvert.DeserializeObject<ItemSize>(data.ToString());

            _itemSizeLogic.AddorUpdate(itemSize);

            return new
            {
                success = true,
                ItemSize = new { Record = itemSize, TotalRecords = 1 },
            };
        }

        //make

        [Route("api/make")]
        [HttpGet]
        public Object GetMake()
        {
            List<Make> list = _makeLogic.GetMake();

            return new
            {
                success = true,
                Make = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/make/query")]
        [HttpGet]
        public Object GetMakePagedWithQuery(string query)
        {
            List<Make> list = _makeLogic.GetMakeFiltered(query);
            return new
            {
                success = true,
                Make = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/make/{id:int}")]
        [HttpGet]

        public object GetMakeSizeById(int id)
        {
            return _makeLogic.GetMakeById(id);
        }

        [Route("api/make/save")]
        [HttpPost]
        public Object SaveMake(dynamic data)
        {
            var make = JsonConvert.DeserializeObject<Make>(data.ToString());

            _makeLogic.AddorUpdate(make);

            return new
            {
                success = true,
                Make = new { Record = make, TotalRecords = 1 },
            };
        }

        //grade

        [Route("api/grade")]
        [HttpGet]
        public Object GetGrade()
        {
            List<Grade> list = _gradeLogic.GetGrade();

            return new
            {
                success = true,
                Grade = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/grade/query")]
        [HttpGet]
        public Object GetGradePagedWithQuery(string query)
        {
            List<Grade> list = _gradeLogic.GetGradeFiltered(query);
            return new
            {
                success = true,
                Grade = new { Record = list, TotalRecords = list.Count }
            };
        }

        [Route("api/grade/{id:int}")]
        [HttpGet]

        public object GetGradeById(int id)
        {
            return _gradeLogic.GetGradeById(id);
        }

        [Route("api/grade/save")]
        [HttpPost]
        public Object SaveGrade(dynamic data)
        {
            var grade = JsonConvert.DeserializeObject<Grade>(data.ToString());

            _gradeLogic.AddorUpdate(grade);

            return new
            {
                success = true,
                Garde = new { Record = grade, TotalRecords = 1 },
            };
        }
        // accounts Type
        [Route("api/accounttype")]
        [HttpGet]
        public Object GetAccountType()
        {

            List<AccountType> list = _accountLogic.GetAccountType();
            return new
            {
                success = true,
                AccountType = new { Record = list, TotalRecords = list.Count }
            };
        }

        // accounts.PaymentMethod Type
        [Route("api/payments")]
        [HttpGet]
        public Object GetPaymentMethod()
        {
            List<PaymentMethod> list = _paymentMethodLogic.GetPaymentMenthod();
            return new
            {
                success = true,
                PaymentMethod = new { Record = list, TotalRecords = list.Count }
            };
        }
    }
}
