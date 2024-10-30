# Cheatsheet IndexedDB

## 1. Abrir la base de datos

```javascript
let request = indexedDB.open("miBaseDeDatos", 1);
```
Le pasas el nombre de la base de datos y la version por parametros

### Eventos principales
- **onupgradeneeded**: Se ejecuta cuando se crea o actualiza la estructura de la base de datos.
```javascript
request.onupgradeneeded = (event) => {
    let db = event.target.result;
    // Crear almacenes o índices aquí
};
```

- **onduccess**: Se ejecut cuando se abre correctamente la base de datos
```javascript
request.onsuccess = (event) => {
    let db = event.target.result;
    // Listo para usar la base de datos
};
```

- **onerror**: Se ejecuta si ocurre un error al abrir la base de datos.
```javascript
request.onerror = (event) => {
    console.error("Error al abrir la base de datos:", event.target.error);
};
```

## 2. Crear ObjectStore

```javascript
let objectStore = db.createObjectStore("ejemplo", {keyPath: "id", autoIncrement: true});
```
Esta funcion crea un almacen llamado *ejemplo* con *id* como campo primario y autoincrementado, es decir que cada vez que se crea una nuevo se le suma 1.

## 3. Crear indice en el objectStore

```javascript
objectStore.createIndex("nombre", "nombre", { unique: false });
```
Crea un indice llamado *nombre* el cual se le pasa por el primer paramatro, por el segundo parametro se le pasa es el nombre del campo de registro y por ultimo se le dice que ese campo no es unico en el almacen es decir que puede haber varios registros con el mismo nombre.

## 4. Transacciones

```javascript
let transaction = db.transaction(["ejemplo"], "readwrite");
```
Crea una transaccion para realizar operaciones en el almacen, en el primer parametro de la funcion se introduce el almacen en el cual se quieran hacer las operaciones y en el segundo el tipo de operacion que quieras usar en este caso se una una de lectura y escritura pero tambien puede ser solo lectura con *"readonly"*