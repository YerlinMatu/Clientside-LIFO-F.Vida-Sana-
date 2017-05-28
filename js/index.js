"use strict";

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
  Escrito por : Yerlinson Maturana (Matu Creativo).
  Email: yerlinmatu@gmail.com
  Github: https://github.com/YerlinMatu
  Twitter: @yerlinmatu 
*/

// USUARIO
var Aportante = [];
var Total_aportes = 0;

var Usuario = function Usuario(nombre, apellidos, telefono, cedula, aporte) {
  _classCallCheck(this, Usuario);

  this.nombre = nombre.length != 0 ? nombre.Capitalize() : "Anonimo ".concat(cont++);
  this.apellidos = apellidos.trim().Capitalize() || "Sin apellidos";
  this.telefono = +Math.abs(telefono);
  this.cedula = Math.abs(cedula) || 0;
  this.aporte = parseFloat(+aporte) || 0;
  Total_aportes += this.aporte;
};

// Capitalizado :

String.prototype.Capitalize = function () {
  return this.charAt(0).toUpperCase() + this.slice(1);
};

//  cont++
var cont = 1;

function SendData() {
  var n = $("#nombre").val(),
      a = $("#apellidos").val(),
      t = $("#telefono").val(),
      cc = parseInt($("#cedula").val()),
      v = $("#aporte").val();
  if (n !== '' && a !== '' && t !== '' && cc !== '' && v !== '') {
    var person = new Usuario(n, a, t, cc, v);
    var nameTemp = person.nombre;
    Aportante.push(person);
    console.log(Aportante);
    $Dom('formID').reset(); // Reseting.
    SucessMsg("Se registró " + nameTemp + " correctamente", 'Ya se ingreso a la base de datos.', 2500);
  } else {
    SucessMsg('Por favor ingrese los datos solicitados :(', 'Los campos están vacios', 2500);
  }
} // Client send.

function $Dom($id) {
  return document.getElementById($id);
}
var question = ["¿Cuál es su nombre?", "¿Cuáles son sus apellidos?", "Número telefónonico", "Número de cédula", "Valor a aportar"];

var DeleteAportante = function DeleteAportante() {
  if (Aportante.length > 0) {
    var user_despachado = Aportante.pop();
    user_despachado = user_despachado.nombre;
    ViewTabla();
    SucessMsg("El aportante " + user_despachado + " se eliminó exitosamente", 'Puede seguir registrando');
  } else {
    SucessMsg("No hay aportantes registrados", 'Puede seguir registrando');
  }
};
// Busqueda.
var SearchAportante = function SearchAportante() {

  var user_req = $('#searching').val().trim().Capitalize();
  Aportante.map(function (user) {
    if (user.nombre === user_req || user.apellidos === user_req || user.telefono === user_req) {
      return SucessMsg("\n              Nombre: " + user.nombre + "\n              Apellidos: " + user.apellidos + "\n\n              Teléfono: " + user.telefono + "\n\n              cc: " + user.cedula + "\n\n                ", '', 5000);
    } else {
      return swal({
        title: "No existe " + user_req + " aportante",
        text: user_req + " no sé registró",
        type: "error",
        confirmButtonText: "Cerrar",
        confirmButtonColor: '#490a3d'
      });
    }
  });
};

// FORMULARIO.
var FormRegistro = React.createClass({
  displayName: "FormRegistro",

  render: function render() {
    return React.createElement(
      "div",
      { className: "Formulario" },
      React.createElement(
        "h2",
        null,
        React.createElement("i", { className: "fa fa-address-book", "aria-hidden": "true" }),
        " Registro"
      ),
      React.createElement(
        "form",
        { id: "formID" },
        React.createElement(
          "label",
          { "for": "nombre" },
          "Nombre"
        ),
        React.createElement("input", { type: "text", placeholder: question[0], id: "nombre", required: true }),
        React.createElement(
          "label",
          { "for": "apellidos" },
          "Apellidos"
        ),
        React.createElement("input", { type: "text", placeholder: question[1], id: "apellidos", required: true }),
        React.createElement(
          "label",
          { "for": "telefono" },
          "Teléfono"
        ),
        React.createElement("input", { type: "number", placeholder: question[2], id: "telefono", min: "7", max: "10", required: true }),
        React.createElement(
          "label",
          { "for": "cedula" },
          "Cédula"
        ),
        React.createElement("input", { type: "number", min: "1", max: "10", placeholder: question[3], id: "cedula", readonly: "readonly", required: "required" }),
        React.createElement(
          "label",
          { "for": "Valor a aportar" },
          "Dinero"
        ),
        React.createElement("input", { type: "number", min: "1", max: "10", placeholder: question[4], id: "aporte", readonly: "readonly", required: "required" }),
        React.createElement(
          "button",
          { className: "btn", type: "button", onClick: SendData },
          React.createElement("i", { className: "fa fa fa-plus", "aria-hidden": "true" }),
          " Registrar"
        ),
        React.createElement(
          "button",
          { className: "btn", type: "button", onClick: ViewTabla },
          React.createElement("i", { className: "fa fa fa fa-database", "aria-hidden": "true" }),
          " Ver registrados"
        )
      )
    );
  }
});

//  DATAGRIV:
var DataGriv = function (_React$Component) {
  _inherits(DataGriv, _React$Component);

  function DataGriv(props) {
    _classCallCheck(this, DataGriv);

    var _this = _possibleConstructorReturn(this, _React$Component.call(this, props));

    _this.state = {
      User: Aportante
    };
    return _this;
  }

  DataGriv.prototype.render = function render() {
    var data = this.state.User.map(function (Aportante, i) {
      return React.createElement(
        "tr",
        { key: i },
        React.createElement(
          "th",
          null,
          Aportante.nombre
        ),
        React.createElement(
          "th",
          null,
          Aportante.apellidos
        ),
        React.createElement(
          "th",
          null,
          Aportante.telefono
        ),
        React.createElement(
          "th",
          null,
          Aportante.cedula
        ),
        React.createElement(
          "th",
          null,
          Aportante.aporte
        )
      );
    });
    return React.createElement(
      "div",
      { className: "Formulario Griv" },
      React.createElement(
        "h2",
        null,
        React.createElement("i", { className: "fa fa-database", "aria-hidden": "true" }),
        " Datos en Pila "
      ),
      React.createElement(
        "label",
        { "for": "search" },
        React.createElement("i", { className: "fa fa-search", "aria-hidden": "true" }),
        " Buscador"
      ),
      React.createElement("input", { id: "searching", type: "search", placeholder: "Buscar por nombre..." }),
      React.createElement(
        "div",
        { "class": "container" },
        React.createElement(
          "strong",
          { className: "cont" },
          React.createElement("i", { className: "fa fa-user", "aria-hidden": "true" }),
          " Aportantes :  ",
          data.length
        ),
        React.createElement(
          "strong",
          { className: "cont2" },
          React.createElement("i", { className: "fa fa-money", "aria-hidden": "true" }),
          "   Dinero : $",
          Total_aportes
        ),
        React.createElement(
          "table",
          { id: "table" },
          React.createElement(
            "thead",
            null,
            React.createElement(
              "tr",
              null,
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement(
                    "i",
                    { className: "fa fa-user", "aria-hidden": "true" },
                    " "
                  ),
                  "Nombre"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement(
                    "i",
                    { className: "fa fa-users", "aria-hidden": "true" },
                    " "
                  ),
                  "Apellidos"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement("i", { className: "fa fa-phone", "aria-hidden": "true" }),
                  "Teléfono"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement("i", { className: "fa fa-id-card", "aria-hidden": "true" }),
                  "Cédula"
                )
              ),
              React.createElement(
                "th",
                null,
                React.createElement(
                  "strong",
                  null,
                  React.createElement("i", { className: "fa fa-credit-card-alt", "aria-hidden": "true" }),
                  "Aporte"
                )
              )
            )
          ),
          React.createElement(
            "tbody",
            null,
            data
          )
        )
      ),
      React.createElement(PadButton, null)
    ); // end render.
  };

  return DataGriv;
}(React.Component);

;

var PadButton = React.createClass({
  displayName: "PadButton",

  render: function render() {
    return React.createElement(
      "div",
      { className: "container" },
      React.createElement(
        "div",
        { className: "row" },
        React.createElement(
          "div",
          { className: "colum" },
          React.createElement(
            "button",
            { className: "btn", onClick: SearchAportante },
            React.createElement("i", { className: "fa fa fa fa-search", "aria-hidden": "true" }),
            " Buscar"
          ),
          React.createElement(
            "button",
            { className: "btn", onClick: ViewRegistro },
            React.createElement("i", { className: "fa fa fa fa-plus", "aria-hidden": "true" }),
            " Registrar"
          ),
          React.createElement(
            "button",
            { className: "btn", onClick: DeleteAportante },
            React.createElement("i", { className: "fa fa fa fa-trash", "aria-hidden": "true" }),
            " Eliminar en pila"
          )
        )
      )
    );
  }
});
/* RENDERS URLS */
GlobalRenderID(React.createElement(FormRegistro, null), 'app');

function ViewTabla() {
  return GlobalRenderID(React.createElement(DataGriv, null), 'app');
}

function ViewRegistro() {
  return GlobalRenderID(React.createElement(FormRegistro, null), 'app');
}
// Renderizador Global.
function GlobalRenderID($ComponentTag, $element) {
  return ReactDOM.render($ComponentTag, document.getElementById($element));
}

function SucessMsg(title, msg, time, btnBool) {
  swal({
    title: title,
    text: msg,
    timer: time || 1600,
    showConfirmButton: btnBool || false
  });
}