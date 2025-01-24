sap.ui.define([
    "sap/ui/core/mvc/Controller",
    "sap/m/MessageBox",
    "sap/ui/model/Filter",
    "sap/ui/model/FilterOperator",
        "sap/ui/core/Fragment"


], (Controller, MessageBox, Filter, FilterOperator,Fragment) => {
    "use strict";

    return Controller.extend("wb.wbprodct.controller.MainView", {
        onInit() {

            /*var oModel = new sap.ui.model.json.JSONModel({
                availableFilters: [
                    { key: "A0COMP_CODE", text: "Código de Compañía" },
                    { key: "A0RECONTRACT", text: "Contrato" },
                    { key: "A0REOBJECT_T", text: "RealEstateObject" },
                    { key: "A0CONDPURP_T", text: "ConditionPurpose" }
                ],
                selectedFilters: [] // Aquí se guardarán los filtros seleccionados
            });
            this.getView().setModel(oModel);
*/
            
        },


        onClearPress: function () {
            // Obtiene el Input por su ID y limpia su valor
            var oInput = this.byId("inputIdentifier");
            if (oInput) {
                oInput.setValue(""); // Limpia el valor del Input
            }
        },

        
          
        onAdaptFiltersPress: function () {
            if (!this._oDialog) {
                Fragment.load({
                    id: this.getView().getId(), // Genera IDs únicos basados en el ID de la vista principal
                    name: "wb.wbprodct.view.AdaptFiltersDialog",
                    controller: this // Cambié el controlador al actual
                }).then(function (oDialog) {
                    this._oDialog = oDialog;
                    this.getView().addDependent(oDialog);
                    oDialog.open();
                }.bind(this));
            } else {
                this._oDialog.open();
            }
        },
        
        onSearch: function () {
            var oFilters = [];
            var sMonth = this.byId("inputMonth").getValue().trim() || "";
            var sMonthTo = this.byId("inputMonthTo").getValue().trim() || "";
            var sCompanyCode = this.byId("inputCompanyCode").getValue() || "0000";
            var sRecontract = this.byId("inputRecontract").getValue() || " ";
            var sRecontractTo = this.byId("inputRecontractTo").getValue() || " ";
            var sContrType = this.byId("inputContrType").getValue() || " ";
            var sContrTypeTo = this.byId("inputContrTypeTo").getValue() || " ";
            var sRecdType = this.byId("inputRecdType").getValue() || " ";
            var sRecdTypeTo = this.byId("inputRecdTypeTo").getValue() || " ";
    
          //  console.log("meses insertdos: " + sMonth + sMonthTo);
    
            var sFormattedMonth = this.formatDate(sMonth);
            var sFormattedMonthTo = this.formatDate(sMonthTo);
    
            // Construct the path dynamically
            var sPath = `/ZPIFA(A0CIIM_CALMONTH='${sFormattedMonth}',A0CIIM_CALMONTHTo='${sFormattedMonthTo}',A0CISO_RECONTRACT='',A0CISO_RECONTRACTTo='',A0CISO_CONTRTYPE='',A0CISO_CONTRTYPETo='',A0CISO_RECDTYPE='',A0CISO_RECDTYPETo='',ZVAR_M_COMP_CODE='${sCompanyCode}')/Results`;
            
            // Get table reference
            var oTable = this.byId("table");
            var oList = this.byId("productList");

            try {
                // Update table binding
                oTable.bindItems({
                    path: sPath,
                    template: oTable.getBindingInfo("items").template // Reuse existing template
                });
        
                // Update list binding
                oList.bindItems({
                    path: sPath,
                    template: oList.getBindingInfo("items").template // Reuse existing template
                });

                
                console.log("Path:", sPath);

            } catch (error) {
                console.error("Error binding table: ", error);
                sap.m.MessageToast.show("Vuelve a intentar");
            }
        },
    
        // Definir la función formatDate dentro del controlador
        formatDate: function (input) {
            // Verificar si el formato es YYYY-MM
            if (input.length === 7 && input.includes("-")) {
                var parts = input.split("-"); // Dividir por el guion
                var year = parts[0];          // Año
                var month = parts[1];         // Mes
                return month + "." + year;    // Formato MM.YYYY
            }
            // Verificar si el formato es YYYYMM
            else if (input.length === 6) {
                var year = input.slice(0, 4); // Extraer año
                var month = input.slice(4, 6); // Extraer mes
                return month + "." + year;     // Formato MM.YYYY
            }
    
            // Si el formato es inválido
            console.warn("Formato de fecha no válido:", input);
            return "01.2024"; // Fecha predeterminada en caso de error
        },

        
        
        
       /* onSearch: function(oEvent) {
            var oFilters = [];
            
            // Obtener valores de los filtros
            var sMonth = this.byId("inputMonth").getValue();
            var sMonthTo = this.byId("inputMonthTo").getValue();
            var sCompanyCode = this.byId("inputCompanyCode").getValue();
            var sRecontract = this.byId("inputRecontract").getValue();
            var sRecontractTo = this.byId("inputRecontractTo").getValue();
            var sContrType = this.byId("inputContrType").getValue();
            var sContrTypeTo = this.byId("inputContrTypeTo").getValue();
            var sRecdType = this.byId("inputRecdType").getValue();
            var sRecdTypeTo = this.byId("inputRecdTypeTo").getValue();
            
            console.log("CODIGO-------"+ sCompanyCode);
            // Crear filtros basados en los valores
            if (sMonth) {
                oFilters.push(new Filter("A0CIIM_CALMONTH", FilterOperator.EQ, sMonth));
            }
            if (sMonthTo) {
                oFilters.push(new Filter("A0CIIM_CALMONTHTo", FilterOperator.EQ, sMonthTo));
            }
            if (sCompanyCode) {
                oFilters.push(new Filter("ZVAR_M_COMP_CODE", FilterOperator.EQ, sCompanyCode));
            }
            if (sRecontract) {
                oFilters.push(new Filter("A0CISO_RECONTRACT", FilterOperator.EQ, sRecontract));
            }
            if (sRecontractTo) {
                oFilters.push(new Filter("A0CISO_RECONTRACTTo", FilterOperator.EQ, sRecontractTo));
            }
            if (sContrType) {
                oFilters.push(new Filter("A0CISO_CONTRTYPE", FilterOperator.EQ, sContrType));
            }
            if (sContrTypeTo) {
                oFilters.push(new Filter("A0CISO_CONTRTYPETo", FilterOperator.EQ, sContrTypeTo));
            }
            if (sRecdType) {
                oFilters.push(new Filter("A0CISO_RECDTYPE", FilterOperator.EQ, sRecdType));
            }
            if (sRecdTypeTo) {
                oFilters.push(new Filter("A0CISO_RECDTYPETo", FilterOperator.EQ, sRecdTypeTo));
            }

            
            // Aplicar los filtros a la lista o la entidad correspondiente
            var oTable = this.byId("table");
            var oBinding = oTable.getBinding("items");
            oBinding.filter(oFilters);
        },*/
        


       /* onSearch: function (oEvent) {
            // Obtener el valor del campo de búsqueda
            var sQuery = oEvent.getParameter("newValue");
            var aFilters = [];
        
            if (sQuery && sQuery.length > 0) {
                // Crear un filtro para buscar en el campo A0RECONTRACT
                aFilters.push(new Filter("A0RECONTRACT", FilterOperator.Contains, sQuery));
         //       aFilters.push(new Filter("A0REOBJECT_T", FilterOperator.Contains, sQuery));
           //     aFilters.push(new Filter("ZRE_CCTYP", FilterOperator.Contains, sQuery));

            }
        
            // Crear el filtro combinado (en este caso, no se necesita combinar)
            var oFilter = new Filter({
                filters: aFilters,
                and: true
            });
        
            // Obtener la lista y aplicar el filtro
            var oList = this.getView().byId("productList");
            var oBinding = oList.getBinding("items");
            oBinding.filter(oFilter, "Application");
        },*/
        

        
        onSelectionChange: function (oEvent) {
            var oSelectedItem = oEvent.getParameter("listItem");
            var oContext = oSelectedItem.getBindingContext();
        
            if (!oContext) {
                console.error("Binding context is null. Check your model and data binding.");
                return;
            }
        
            var oData = oContext.getObject();
            console.log("Selected Data:", oData);
        
            // Actualizar el ObjectHeader
            var oObjectHeader = this.getView().byId("objectHeader");
            oObjectHeader.setTitle(oData.A0COMP_CODE || "Sin título");
            oObjectHeader.setNumber(oData.A0RECONTRACT || "-");
            oObjectHeader.setIntro("Detalles del ítem seleccionado");
        }

                
    });
});