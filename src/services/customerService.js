import httpService from "./httpService";

const apiCustomers = "/customers/";

export function getCustomers() {
  return httpService.get(apiCustomers);
}

export function deleteCustomer(customerId) {
  return httpService.delete(apiCustomers + customerId);
}

export function getCustomer(customerId) {
  return httpService.get(apiCustomers + customerId);
}

export function saveCustomer(customer) {
  if (!customer._id) return httpService.post(apiCustomers, customer);

  //if exist, use put method but remove the _id attribute from the object.
  const data = { ...customer };
  delete data._id;

  return httpService.put(apiCustomers + customer._id, data);
}
