const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const morgan = require('morgan');
const swaggerUi = require('swagger-ui-express');
const YAML = require('yamljs');
const path = require('path');

const PORT = process.env.PORT || 3000;

const ALLOWED_STATUS = ['TODO', 'IN_PROGRESS', 'DONE'];

let tasks = [];
let nextId = 1;

function nowIso() {
  return new Date().toISOString();
}

function seedData() {
  tasks = [
    {
      id: nextId++,
      title: 'Crear API base para portafolio',
      description: 'CRUD simple para automatización API.',
      status: 'TODO',
      createdAt: nowIso(),
      updatedAt: nowIso()
    },
    {
      id: nextId++,
      title: 'Automatizar flujo CRUD feliz',
      description: 'Crear, consultar, actualizar y eliminar una tarea.',
      status: 'IN_PROGRESS',
      createdAt: nowIso(),
      updatedAt: nowIso()
    }
  ];
}

function resetStore() {
  tasks = [];
  nextId = 1;
  seedData();
  return tasks;
}

function findTask(id) {
  return tasks.find((task) => task.id === Number(id));
}

function validateTaskPayload(payload, { partial = false } = {}) {
  const errors = [];

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'title')) {
    if (typeof payload.title !== 'string' || payload.title.trim().length < 3 || payload.title.trim().length > 80) {
      errors.push({ field: 'title', message: 'title must be a string between 3 and 80 characters' });
    }
  }

  if (Object.prototype.hasOwnProperty.call(payload, 'description') && payload.description !== undefined) {
    if (typeof payload.description !== 'string' || payload.description.trim().length > 250) {
      errors.push({ field: 'description', message: 'description must be a string with max 250 characters' });
    }
  }

  if (!partial || Object.prototype.hasOwnProperty.call(payload, 'status')) {
    if (!ALLOWED_STATUS.includes(payload.status)) {
      errors.push({ field: 'status', message: `status must be one of: ${ALLOWED_STATUS.join(', ')}` });
    }
  }

  return errors;
}

function errorResponse(res, status, code, message, details = []) {
  return res.status(status).json({
    code,
    message,
    details,
    timestamp: nowIso()
  });
}

function createApp() {
  const app = express();

  app.use(helmet());
  app.use(cors());
  app.use(express.json());
  app.use(morgan('combined'));

  app.use((req, res, next) => {
    res.setHeader('X-API-Version', '1.0.0');
    next();
  });

  const swaggerDocument = YAML.load(path.join(__dirname, '../openapi.yaml'));
  app.use('/docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

  app.get('/', (_req, res) => {
    res.json({
      name: 'Portfolio CRUD API',
      version: '1.0.0',
      docs: '/docs',
      health: '/health'
    });
  });

  app.get('/health', (_req, res) => {
    res.json({
      code: 200,
      message: 'API is healthy',
      response: {
        status: 'UP',
        uptimeSeconds: Math.round(process.uptime()),
        timestamp: nowIso()
      }
    });
  });

  app.get('/api/v1/tasks', (req, res) => {
    const { status, search } = req.query;
    let result = [...tasks];

    if (status) {
      if (!ALLOWED_STATUS.includes(status)) {
        return errorResponse(res, 400, 'INVALID_STATUS_FILTER', 'Invalid status filter', [
          { field: 'status', message: `status must be one of: ${ALLOWED_STATUS.join(', ')}` }
        ]);
      }
      result = result.filter((task) => task.status === status);
    }

    if (search) {
      const normalizedSearch = String(search).toLowerCase();
      result = result.filter((task) =>
        task.title.toLowerCase().includes(normalizedSearch) ||
        task.description.toLowerCase().includes(normalizedSearch)
      );
    }

    res.json({
      code: 200,
      message: 'Tasks retrieved successfully',
      response: {
        total: result.length,
        items: result
      }
    });
  });

  app.post('/api/v1/tasks', (req, res) => {
    const payload = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status || 'TODO'
    };

    const errors = validateTaskPayload(payload);
    if (errors.length > 0) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'Request validation failed', errors);
    }

    const timestamp = nowIso();
    const task = {
      id: nextId++,
      title: payload.title.trim(),
      description: payload.description.trim(),
      status: payload.status,
      createdAt: timestamp,
      updatedAt: timestamp
    };

    tasks.push(task);

    res.status(201).json({
      code: 201,
      message: 'Task created successfully',
      response: task
    });
  });

  app.get('/api/v1/tasks/:id', (req, res) => {
    const task = findTask(req.params.id);

    if (!task) {
      return errorResponse(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }

    res.json({
      code: 200,
      message: 'Task retrieved successfully',
      response: task
    });
  });

  app.put('/api/v1/tasks/:id', (req, res) => {
    const task = findTask(req.params.id);

    if (!task) {
      return errorResponse(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }

    const payload = {
      title: req.body.title,
      description: req.body.description || '',
      status: req.body.status
    };

    const errors = validateTaskPayload(payload);
    if (errors.length > 0) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'Request validation failed', errors);
    }

    task.title = payload.title.trim();
    task.description = payload.description.trim();
    task.status = payload.status;
    task.updatedAt = nowIso();

    res.json({
      code: 200,
      message: 'Task updated successfully',
      response: task
    });
  });

  app.patch('/api/v1/tasks/:id/status', (req, res) => {
    const task = findTask(req.params.id);

    if (!task) {
      return errorResponse(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }

    if (!ALLOWED_STATUS.includes(req.body.status)) {
      return errorResponse(res, 400, 'VALIDATION_ERROR', 'Request validation failed', [
        { field: 'status', message: `status must be one of: ${ALLOWED_STATUS.join(', ')}` }
      ]);
    }

    task.status = req.body.status;
    task.updatedAt = nowIso();

    res.json({
      code: 200,
      message: 'Task status updated successfully',
      response: task
    });
  });

  app.delete('/api/v1/tasks/:id', (req, res) => {
    const index = tasks.findIndex((task) => task.id === Number(req.params.id));

    if (index === -1) {
      return errorResponse(res, 404, 'TASK_NOT_FOUND', 'Task not found');
    }

    const [deleted] = tasks.splice(index, 1);

    res.json({
      code: 200,
      message: 'Task deleted successfully',
      response: deleted
    });
  });

  app.post('/api/v1/test/reset', (_req, res) => {
    if (process.env.NODE_ENV === 'production') {
      return errorResponse(res, 403, 'RESET_DISABLED', 'Reset endpoint is disabled in production');
    }

    const result = resetStore();
    res.json({
      code: 200,
      message: 'Test data reset successfully',
      response: {
        total: result.length,
        items: result
      }
    });
  });

  app.use((_req, res) => {
    errorResponse(res, 404, 'ROUTE_NOT_FOUND', 'Route not found');
  });

  return app;
}

resetStore();

if (require.main === module) {
  const app = createApp();
  app.listen(PORT, () => {
    console.log(`Portfolio CRUD API running on http://localhost:${PORT}`);
    console.log(`Swagger docs available on http://localhost:${PORT}/docs`);
  });
}

module.exports = { createApp, resetStore };
