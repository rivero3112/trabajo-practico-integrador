# =============================================
# ✅ BACKEND COMPLETO FLASK - FIT21
# =============================================

from flask import Flask, request, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from datetime import datetime
from sqlalchemy.exc import IntegrityError

app = Flask(__name__)
CORS(app)

# ---------------------------------------------
# CONFIGURACIÓN BASE DE DATOS
# ---------------------------------------------
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+mysqlconnector://gymfit21:root1234@gymfit21.mysql.pythonanywhere-services.com/gymfit21$default'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
db = SQLAlchemy(app)


# ---------------------------------------------
# MODELO
# ---------------------------------------------
# ---------------------------------------------
# MODELO
# ---------------------------------------------
class Usuario(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    nombre = db.Column(db.String(255))
    apellido = db.Column(db.String(255))
    nacimiento = db.Column(db.Date, nullable=True)
    email = db.Column(db.String(255), unique=True)
    password = db.Column(db.String(255))
    genero = db.Column(db.String(1))

    def __init__(self, nombre, apellido, nacimiento, email, password, genero):
        self.nombre = nombre
        self.apellido = apellido
        self.nacimiento = nacimiento
        self.email = email
        self.password = password
        self.genero = genero


with app.app_context():
    db.create_all()


# ---------------------------------------------
# RUTA PRINCIPAL
# ---------------------------------------------
@app.route('/')
def index():
    return '✅ API FIT21 funcionando correctamente.'


# ---------------------------------------------
# RUTA: REGISTRAR NUEVO USUARIO
# ---------------------------------------------
@app.route('/registro', methods=['POST'])
def registro():
    try:
        data = request.get_json(force=True)
        print("📩 Datos recibidos:", data)

        nombre = data.get('nombre', '').strip()
        apellido = data.get('apellido', '').strip()
        nacimiento_str = data.get('nacimiento', '').strip()
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()
        genero = data.get('genero', '').strip().upper()

        # Validación básica
        if not nombre or not apellido or not email or not password:
            return jsonify({'error': 'Faltan datos obligatorios'}), 400

        # Validar o limpiar fecha
        nacimiento = None
        if nacimiento_str:
            try:
                nacimiento = datetime.strptime(nacimiento_str, '%Y-%m-%d').date()
            except ValueError:
                print("⚠️ Fecha inválida recibida:", nacimiento_str)
                return jsonify({'error': 'Formato de fecha inválido (use AAAA-MM-DD)'}), 400

        # Validar género
        if genero not in ['M', 'F', 'O', '']:
            genero = ''  # se permite vacío opcionalmente

        # Verificar correo existente
        existente = Usuario.query.filter_by(email=email).first()
        if existente:
            return jsonify({'error': 'El correo ya está registrado'}), 409

        nuevo_usuario = Usuario(
            nombre=nombre,
            apellido=apellido,
            nacimiento=nacimiento,
            email=email,
            password=password,
            genero=genero
        )

        db.session.add(nuevo_usuario)
        db.session.commit()

        print("✅ Usuario registrado correctamente:", nuevo_usuario.id)
        return jsonify({'mensaje': 'Usuario registrado correctamente', 'id': nuevo_usuario.id}), 201

    except IntegrityError:
        db.session.rollback()
        return jsonify({'error': 'El correo ya existe'}), 409

    except Exception as e:
        import traceback
        traceback.print_exc()
        print("❌ Error en /registro:", e)
        return jsonify({'error': str(e)}), 500

# ---------------------------------------------
# RUTA: LISTAR USUARIOS
# ---------------------------------------------
@app.route("/usuarios", methods=["GET"])
def usuarios():
    try:
        all_registros = Usuario.query.all()
        data_serializada = []

        for u in all_registros:
            nacimiento = u.nacimiento

            # ✅ Convertir si viene con hora, sino dejarlo igual
            if isinstance(nacimiento, str):
                nacimiento = nacimiento.split(" ")[0]  # eliminar hora si la hubiera
            elif nacimiento is None:
                nacimiento = ""
            else:
                try:
                    nacimiento = nacimiento.strftime("%Y-%m-%d")
                except Exception:
                    nacimiento = str(nacimiento)

            data_serializada.append({
                "id": u.id,
                "nombre": u.nombre,
                "apellido": u.apellido,
                "nacimiento": nacimiento,
                "email": u.email,
                "password": u.password,
                "genero": u.genero
            })

        return jsonify(data_serializada)

    except Exception as e:
        import traceback
        print("❌ ERROR EN /usuarios:")
        traceback.print_exc()
        return jsonify({"error": str(e)}), 500

# ---------------------------------------------
# RUTA: OBTENER USUARIO POR ID
# ---------------------------------------------
@app.route('/usuarios/<int:id>', methods=['GET'])
def obtener_usuario(id):
    try:
        usuario = Usuario.query.get(id)
        if not usuario:
            return jsonify({"error": "Usuario no encontrado"}), 404

        nacimiento = usuario.nacimiento

        # 🔹 Normalizar fecha para evitar errores con str o None
        if isinstance(nacimiento, str):
            # Si ya viene como texto
            nacimiento = nacimiento.split(" ")[0]
        elif nacimiento is None:
            nacimiento = ""
        else:
            try:
                nacimiento = nacimiento.strftime("%Y-%m-%d")
            except Exception:
                nacimiento = str(nacimiento)

        data_serializada = {
            "id": usuario.id,
            "nombre": usuario.nombre,
            "apellido": usuario.apellido,
            "nacimiento": nacimiento,
            "email": usuario.email,
            "password": usuario.password,
            "genero": usuario.genero,
        }

        return jsonify(data_serializada), 200

    except Exception as e:
        print(f"⚠️ Error en /usuarios/{id}: {e}")
        return jsonify({"error": str(e)}), 500

# ---------------------------------------------
# RUTA: ACTUALIZAR USUARIO
# ---------------------------------------------
@app.route('/update/<int:id>', methods=['PUT'])
def update_usuario(id):
    try:
        usuario = Usuario.query.get_or_404(id)
        data = request.get_json(force=True)

        usuario.nombre = data.get('nombre', usuario.nombre)
        usuario.apellido = data.get('apellido', usuario.apellido)

        nacimiento = data.get('nacimiento', '')
        if nacimiento:
            try:
                usuario.nacimiento = datetime.strptime(nacimiento, '%Y-%m-%d').date()
            except ValueError:
                return jsonify({'error': 'Formato de fecha inválido (use AAAA-MM-DD)'}), 400

        usuario.email = data.get('email', usuario.email)
        usuario.password = data.get('password', usuario.password)
        usuario.genero = data.get('genero', usuario.genero)

        db.session.commit()
        return jsonify({'mensaje': 'Usuario actualizado correctamente'}), 200

    except Exception as e:
        print("❌ Error en /update:", e)
        return jsonify({'error': str(e)}), 500


# ---------------------------------------------
# RUTA: BORRAR USUARIO
# ---------------------------------------------
@app.route('/borrar/<int:id>', methods=['DELETE'])
def borrar_usuario(id):
    try:
        usuario = Usuario.query.get_or_404(id)
        db.session.delete(usuario)
        db.session.commit()
        return jsonify({'mensaje': 'Usuario eliminado correctamente'}), 200
    except Exception as e:
        print("❌ Error al borrar usuario:", e)
        return jsonify({'error': str(e)}), 500


# ---------------------------------------------
# RUTA: LOGIN
# ---------------------------------------------
@app.route('/login', methods=['POST'])
def login():
    try:
        data = request.get_json(force=True)
        email = data.get('email', '').strip().lower()
        password = data.get('password', '').strip()

        usuario = Usuario.query.filter_by(email=email, password=password).first()

        if usuario:
            return jsonify({
                "id": usuario.id,
                "nombre": usuario.nombre,
                "email": usuario.email,
                "mensaje": "Login exitoso"
            }), 200
        else:
            return jsonify({'error': 'Credenciales incorrectas'}), 401

    except Exception as e:
        print("❌ Error en /login:", e)
        return jsonify({'error': str(e)}), 500


# ---------------------------------------------
# MAIN
# ---------------------------------------------
if __name__ == '__main__':
    app.run(debug=True)
