# Vidly client - React.js

## Branches sequence
- Hello world
- Movies list component
- Delete-button
- like-component
- pagination
- filtering
- sorting-1
- sorting-2
- sorting-3
- routing
- forms-1
- forms-2

## Forms - Part 2

Extract a reusable Input component:
```javascript
class Input extends React.Component {
  render() {
    const { id, value, type } = this.props;

    return (
      <div className="form-group">
        <input
          className="form-control"
          onChange={this.props.onChange}
          value={value}
          type={type}
          id={id}
        />
      </div>
    );
  }
}
```

Now use it in the login form:
```javascript
  render() {
    const { account } = this.state;
    return (
      <div>
        <h1>Login</h1>
        <form onSubmit={this.handleSubmit}>
          <Input
            onChange={this.handleChange}
            id="username"
            value={account.username}
            type="text"
          />
          <Input
            onChange={this.handleChange}
            id="password"
            value={account.password}
            type="password"
          />
```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```

```javascript

```