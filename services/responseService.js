
export function success(res, data = null, message = 'Berhasil') {
  return res.status(200).json({
    success: true,
    message,
    data
  });
}

export function created(res, data = null, message = 'Data berhasil dibuat') {
  return res.status(201).json({
    success: true,
    message,
    data
  });
}

export function error(res, error, code = 500) {
  return res.status(code).json({
    success: false,
    message: error.message || 'Terjadi kesalahan',
    error: error
  });
}
