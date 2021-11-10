import React from 'react';
import ReactDOM from 'react-dom';
import { createServer, Model } from 'miragejs';
import { App } from './App';

createServer({
  models: {
    task: Model
  },
  seeds(server) {
      server.db.loadData({
          tasks: [
              {
                  id: 1,
                  description: 'Tarefa 1',
                  completed: false
              },
              {
                  id: 2,
                  description: 'Tarefa 2',
                  completed: false
              },
              {
                  id: 3,
                  description: 'Tarefa 3',
                  completed: false
              },
              {
                  id: 4,
                  description: 'Tarefa 4',
                  completed: false
              },
              {
                  id: 5,
                  description: 'Tarefa 5',
                  completed: false
              }
          ]
    })
  },
  routes() {
      this.get('/tasks/index', async (schema) => {
          return schema.all('task')
      })
      this.get('/tasks/show/:id', async (schema, request) => {
          const id = request.params.id
          return schema.find('task', id)
      })
      this.post('/tasks/create', async (schema, request) => {
          const data = JSON.parse(request.requestBody)
          return schema.create('task', data)
      })
      this.put('/tasks/update/:id', async (schema, request) => {
          const id = request.params.id
          return schema.find('task', id)?.update(request.requestBody)
      })
      this.delete('/tasks/delete/:id', async (schema, request) => {
          const id = request.params.id
          return schema.find('task', id)?.destroy()
      })
  }
})

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);
