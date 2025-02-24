const jwt = require('jsonwebtoken');
const { Usuario, Sesion } = require('../models');

const authMiddleware = async (req, res, next) => {
    console.log('[AuthMiddleware] Iniciando autenticación...');
    const authHeader = req.header('Authorization');

    if (!authHeader || !authHeader.startsWith('Bearer ')) {
        console.error('[AuthMiddleware] Error de autenticación: No se proporcionó un token válido.');
        return res.status(401).json({
            success: false,
            message: 'Acceso denegado. Token no proporcionado o formato inválido.',
        });
    }

    const token = authHeader.replace('Bearer ', '');

    try {
        // Verificar el token JWT
        const decoded = jwt.verify(token, process.env.JWT_SECRET);

        console.log('[AuthMiddleware] Token decodificado:', decoded);

        // Validar que el usuario asociado exista y esté activo
        const usuario = await Usuario.findByPk(decoded.id, {
            attributes: ['id', 'nombre', 'activo'],
        });

        if (!usuario || !usuario.activo) {
            console.error('[AuthMiddleware] Error de autenticación: Usuario no encontrado o inactivo.');
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. Usuario no válido o inactivo.',
            });
        }

        // Validar que exista una sesión activa asociada al usuario
        const sesionActiva = await Sesion.findOne({
            where: { usuario_id: usuario.id, activo: true },
        });

        if (!sesionActiva) {
            console.error('[AuthMiddleware] Error de autenticación: Sesión no válida o expirada.');
            return res.status(401).json({
                success: false,
                message: 'Acceso denegado. Sesión no válida.',
            });
        }

        // Almacenar el usuario y sesión en el objeto de la solicitud
        req.usuario = {
            id: usuario.id,
            nombre: usuario.nombre,
        };
        req.sesion = sesionActiva;

        console.log('[AuthMiddleware] Autenticación exitosa para el usuario con ID:', usuario.id);
        next();
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            console.error('[AuthMiddleware] Error de autenticación: Token expirado.');
            return res.status(401).json({
                success: false,
                message: 'Token expirado. Por favor, inicie sesión nuevamente.',
            });
        }

        console.error('[AuthMiddleware] Error de autenticación: Token inválido.', error.message);
        return res.status(401).json({
            success: false,
            message: 'Token inválido. Por favor, inicie sesión nuevamente.',
        });
    }
};

module.exports = authMiddleware;