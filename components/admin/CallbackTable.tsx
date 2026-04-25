"use client"

import { useEffect, useMemo, useState } from "react"
import {
  HiOutlineSearch,
  HiOutlineDownload,
  HiOutlineTrash,
  HiOutlinePhone,
  HiOutlineMail,
  HiOutlineFilter,
  HiOutlineChevronLeft,
  HiOutlineChevronRight,
  HiOutlinePencil,
  HiOutlineX,
  HiOutlineCheck,
  HiOutlineCalendar,
} from "react-icons/hi"
import { FaWhatsapp } from "react-icons/fa"
import { MdPhoneCallback } from "react-icons/md"

interface CallbackLead {
  id: number
  name: string
  phone: string
  email: string
  created_at?: string
}

const PAGE_SIZE_OPTIONS = [
  10, 25, 50, 100,
]

function fmtDate(
  iso?: string
) {
  if (!iso) return "—"

  return new Date(
    iso
  ).toLocaleString(
    "en-IN",
    {
      day: "2-digit",
      month: "short",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    }
  )
}

function fmtDateShort(
  iso?: string
) {
  if (!iso) return ""

  return new Date(
    iso
  ).toLocaleDateString(
    "en-IN",
    {
      day: "numeric",
      month: "short",
      year: "numeric",
    }
  )
}

function toInputDate(
  d: Date
) {
  return d
    .toISOString()
    .split("T")[0]
}

export default function CallbackTable() {
  const [
    rows,
    setRows,
  ] = useState<
    CallbackLead[]
  >([])

  const [
    loading,
    setLoading,
  ] = useState(true)

  const [
    search,
    setSearch,
  ] = useState("")

  const [
    pageSize,
    setPageSize,
  ] = useState(10)

  const [
    page,
    setPage,
  ] = useState(1)

  const [
    dateFrom,
    setDateFrom,
  ] = useState("")

  const [
    dateTo,
    setDateTo,
  ] = useState("")

  const [
    showFilters,
    setShowFilters,
  ] = useState(false)

  const [
    selected,
    setSelected,
  ] = useState<
    Set<number>
  >(new Set())

  const [
    deletingIds,
    setDeletingIds,
  ] = useState<
    Set<number>
  >(new Set())

  const [
    editing,
    setEditing,
  ] =
    useState<CallbackLead | null>(
      null
    )

  const [
    editForm,
    setEditForm,
  ] =
    useState<
      Partial<CallbackLead>
    >({})

  const [
    saving,
    setSaving,
  ] = useState(false)

  useEffect(() => {
    fetch(
      "/api/callback-request"
    )
      .then((r) =>
        r.json()
      )
      .then((d) => {
        setRows(d || [])
        setLoading(false)
      })
      .catch(() =>
        setLoading(false)
      )
  }, [])

  const filtered =
    useMemo(() => {
      return rows.filter(
        (r) => {
          const s =
            search.toLowerCase()

          const matchSearch =
            r.name
              .toLowerCase()
              .includes(
                s
              ) ||
            r.phone.includes(
              search
            ) ||
            r.email
              .toLowerCase()
              .includes(
                s
              )

          const t =
            r.created_at
              ? new Date(
                  r.created_at
                )
              : null

          const matchFrom =
            dateFrom
              ? t &&
                t >=
                  new Date(
                    dateFrom +
                      "T00:00:00"
                  )
              : true

          const matchTo =
            dateTo
              ? t &&
                t <=
                  new Date(
                    dateTo +
                      "T23:59:59"
                  )
              : true

          return (
            matchSearch &&
            matchFrom &&
            matchTo
          )
        }
      )
    }, [
      rows,
      search,
      dateFrom,
      dateTo,
    ])

  const totalPages =
    Math.max(
      1,
      Math.ceil(
        filtered.length /
          pageSize
      )
    )

  const safePage =
    Math.min(
      page,
      totalPages
    )

  const paginated =
    filtered.slice(
      (safePage - 1) *
        pageSize,
      safePage *
        pageSize
    )

  useEffect(() => {
    setPage(1)
  }, [
    search,
    dateFrom,
    dateTo,
    pageSize,
  ])

  const allPageSelected =
    paginated.length >
      0 &&
    paginated.every(
      (r) =>
        selected.has(
          r.id
        )
    )

  const toggleAll =
    () => {
      const s =
        new Set(
          selected
        )

      if (
        allPageSelected
      ) {
        paginated.forEach(
          (r) =>
            s.delete(
              r.id
            )
        )
      } else {
        paginated.forEach(
          (r) =>
            s.add(
              r.id
            )
        )
      }

      setSelected(s)
    }

  const toggleOne = (
    id: number
  ) => {
    const s =
      new Set(
        selected
      )

    s.has(id)
      ? s.delete(id)
      : s.add(id)

    setSelected(s)
  }

  const deleteRow =
    async (
      id: number
    ) => {
      setDeletingIds(
        (p) =>
          new Set(p).add(
            id
          )
      )

      await fetch(
        "/api/delete-callback",
        {
          method:
            "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            { id }
          ),
        }
      )

      setRows((p) =>
        p.filter(
          (r) =>
            r.id !==
            id
        )
      )
    }

  const openEdit = (
    row: CallbackLead
  ) => {
    setEditing(row)
    setEditForm(row)
  }

  const saveEdit =
    async () => {
      setSaving(true)

      await fetch(
        "/api/edit-callback",
        {
          method:
            "POST",
          headers: {
            "Content-Type":
              "application/json",
          },
          body: JSON.stringify(
            editForm
          ),
        }
      )

      setRows((p) =>
        p.map((r) =>
          r.id ===
          editForm.id
            ? {
                ...r,
                ...editForm,
              } as CallbackLead
            : r
        )
      )

      setSaving(false)
      setEditing(null)
    }

  const exportCSV =
    () => {
      const csv =
        "Name,Phone,Email,Date\n" +
        filtered
          .map(
            (r) =>
              `"${r.name}","${r.phone}","${r.email}","${fmtDate(
                r.created_at
              )}"`
          )
          .join("\n")

      const blob =
        new Blob(
          [csv],
          {
            type: "text/csv",
          }
        )

      const a =
        document.createElement(
          "a"
        )

      a.href =
        URL.createObjectURL(
          blob
        )

      a.download =
        "callback-leads.csv"

      a.click()
    }

  const setPreset = (
    p:
      | "today"
      | "week"
      | "month"
      | "all"
  ) => {
    const now =
      new Date()

    if (
      p ===
      "today"
    ) {
      setDateFrom(
        toInputDate(
          now
        )
      )
      setDateTo(
        toInputDate(
          now
        )
      )
    } else if (
      p ===
      "week"
    ) {
      const s =
        new Date(
          now
        )

      s.setDate(
        now.getDate() -
          6
      )

      setDateFrom(
        toInputDate(
          s
        )
      )

      setDateTo(
        toInputDate(
          now
        )
      )
    } else if (
      p ===
      "month"
    ) {
      setDateFrom(
        toInputDate(
          new Date(
            now.getFullYear(),
            now.getMonth(),
            1
          )
        )
      )

      setDateTo(
        toInputDate(
          now
        )
      )
    } else {
      setDateFrom("")
      setDateTo("")
    }
  }

  return (
    <div className="p-4 sm:p-6">
      {/* Header */}
      <div className="mb-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <MdPhoneCallback className="h-5 w-5 text-primary" />

          <h2 className="text-xl font-black uppercase">
            Callback Requests
          </h2>
        </div>

        <button
          onClick={
            exportCSV
          }
          className="rounded-xl bg-black px-4 py-2 text-xs font-bold text-white"
        >
          Export
        </button>
      </div>

      {/* Toolbar */}
      <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative max-w-sm flex-1">
          <HiOutlineSearch className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />

          <input
            value={search}
            onChange={(
              e
            ) =>
              setSearch(
                e.target.value
              )
            }
            placeholder="Search..."
            className="w-full rounded-xl border border-border py-2.5 pl-9 pr-4 text-sm"
          />
        </div>

        <div className="flex gap-2">
          <button
            onClick={() =>
              setShowFilters(
                !showFilters
              )
            }
            className="rounded-xl border px-4 py-2 text-sm"
          >
            <HiOutlineFilter className="h-4 w-4" />
          </button>

          <select
            value={
              pageSize
            }
            onChange={(
              e
            ) =>
              setPageSize(
                Number(
                  e.target
                    .value
                )
              )
            }
            className="rounded-xl border px-3 py-2 text-sm"
          >
            {PAGE_SIZE_OPTIONS.map(
              (
                n
              ) => (
                <option
                  key={
                    n
                  }
                  value={
                    n
                  }
                >
                  {
                    n
                  }
                </option>
              )
            )}
          </select>
        </div>
      </div>

      {/* Filters */}
      {showFilters && (
        <div className="mb-4 rounded-xl border bg-muted/30 p-4">
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              type="date"
              value={
                dateFrom
              }
              onChange={(
                e
              ) =>
                setDateFrom(
                  e.target
                    .value
                )
              }
              className="rounded-xl border px-3 py-2.5"
            />

            <input
              type="date"
              value={
                dateTo
              }
              onChange={(
                e
              ) =>
                setDateTo(
                  e.target
                    .value
                )
              }
              className="rounded-xl border px-3 py-2.5"
            />
          </div>

          <div className="mt-3 flex flex-wrap gap-2">
            {[
              "today",
              "week",
              "month",
              "all",
            ].map(
              (
                p
              ) => (
                <button
                  key={
                    p
                  }
                  onClick={() =>
                    setPreset(
                      p as any
                    )
                  }
                  className="rounded-lg border px-3 py-1.5 text-xs font-semibold"
                >
                  {
                    p
                  }
                </button>
              )
            )}
          </div>
        </div>
      )}

      {/* Table */}
      <div className="hidden overflow-x-auto rounded-xl border md:block">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted">
              <th className="px-4 py-3">
                <input
                  type="checkbox"
                  checked={
                    allPageSelected
                  }
                  onChange={
                    toggleAll
                  }
                />
              </th>

              {[
                "Name",
                "Phone",
                "Email",
                "Date",
                "Actions",
              ].map(
                (
                  h
                ) => (
                  <th
                    key={
                      h
                    }
                    className="px-4 py-3 text-left text-[10px] font-bold uppercase tracking-[0.18em]"
                  >
                    {
                      h
                    }
                  </th>
                )
              )}
            </tr>
          </thead>

          <tbody>
            {loading && (
              <tr>
                <td
                  colSpan={
                    6
                  }
                  className="px-4 py-10 text-center"
                >
                  Loading...
                </td>
              </tr>
            )}

            {!loading &&
              paginated.map(
                (
                  row
                ) => (
                  <tr
                    key={
                      row.id
                    }
                    className="border-b hover:bg-muted/30"
                  >
                    <td className="px-4 py-3">
                      <input
                        type="checkbox"
                        checked={selected.has(
                          row.id
                        )}
                        onChange={() =>
                          toggleOne(
                            row.id
                          )
                        }
                      />
                    </td>

                    <td className="px-4 py-3 font-semibold">
                      {
                        row.name
                      }
                    </td>

                    <td className="px-4 py-3">
                      {
                        row.phone
                      }
                    </td>

                    <td className="px-4 py-3">
                      {
                        row.email
                      }
                    </td>

                    <td className="px-4 py-3 text-xs">
                      {fmtDate(
                        row.created_at
                      )}
                    </td>

                    <td className="px-4 py-3">
                      <div className="flex gap-1.5">
                        <a
                          href={`https://wa.me/${row.phone.replace(
                            /\D/g,
                            ""
                          )}`}
                          target="_blank"
                          className="flex h-8 w-8 items-center justify-center rounded-lg border border-green-200 bg-green-50 text-green-600"
                        >
                          <FaWhatsapp className="h-3.5 w-3.5" />
                        </a>

                        <a
                          href={`tel:${row.phone}`}
                          className="flex h-8 w-8 items-center justify-center rounded-lg border"
                        >
                          <HiOutlinePhone className="h-3.5 w-3.5" />
                        </a>

                        <button
                          onClick={() =>
                            openEdit(
                              row
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border"
                        >
                          <HiOutlinePencil className="h-3.5 w-3.5" />
                        </button>

                        <button
                          onClick={() =>
                            deleteRow(
                              row.id
                            )
                          }
                          className="flex h-8 w-8 items-center justify-center rounded-lg border text-red-500"
                        >
                          <HiOutlineTrash className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </td>
                  </tr>
                )
              )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-between">
        <p className="text-xs text-muted-foreground">
          Page{" "}
          {
            safePage
          }{" "}
          /{" "}
          {
            totalPages
          }
        </p>

        <div className="flex gap-1">
          <button
            onClick={() =>
              setPage(
                1
              )
            }
            className="rounded-lg border px-2 py-1"
          >
            «
          </button>

          <button
            onClick={() =>
              setPage(
                (
                  p
                ) =>
                  Math.max(
                    1,
                    p -
                      1
                  )
              )
            }
            className="rounded-lg border px-2 py-1"
          >
            <HiOutlineChevronLeft className="h-4 w-4" />
          </button>

          <button
            onClick={() =>
              setPage(
                (
                  p
                ) =>
                  Math.min(
                    totalPages,
                    p +
                      1
                  )
              )
            }
            className="rounded-lg border px-2 py-1"
          >
            <HiOutlineChevronRight className="h-4 w-4" />
          </button>

          <button
            onClick={() =>
              setPage(
                totalPages
              )
            }
            className="rounded-lg border px-2 py-1"
          >
            »
          </button>
        </div>
      </div>

      {/* Edit Modal */}
      {editing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div
            onClick={() =>
              setEditing(
                null
              )
            }
            className="absolute inset-0 bg-black/60"
          />

          <div className="relative z-10 w-full max-w-md rounded-2xl bg-white p-6 shadow-2xl">
            <div className="mb-4 flex items-center justify-between">
              <h3 className="text-lg font-black uppercase">
                Edit Callback
              </h3>

              <button
                onClick={() =>
                  setEditing(
                    null
                  )
                }
              >
                <HiOutlineX className="h-5 w-5" />
              </button>
            </div>

            <div className="space-y-3">
              <input
                value={
                  editForm.name ??
                  ""
                }
                onChange={(
                  e
                ) =>
                  setEditForm(
                    {
                      ...editForm,
                      name: e
                        .target
                        .value,
                    }
                  )
                }
                placeholder="Name"
                className="w-full rounded-xl border px-3 py-2.5"
              />

              <input
                value={
                  editForm.phone ??
                  ""
                }
                onChange={(
                  e
                ) =>
                  setEditForm(
                    {
                      ...editForm,
                      phone:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Phone"
                className="w-full rounded-xl border px-3 py-2.5"
              />

              <input
                value={
                  editForm.email ??
                  ""
                }
                onChange={(
                  e
                ) =>
                  setEditForm(
                    {
                      ...editForm,
                      email:
                        e
                          .target
                          .value,
                    }
                  )
                }
                placeholder="Email"
                className="w-full rounded-xl border px-3 py-2.5"
              />
            </div>

            <div className="mt-5 flex justify-end gap-2">
              <button
                onClick={() =>
                  setEditing(
                    null
                  )
                }
                className="rounded-xl border px-4 py-2"
              >
                Cancel
              </button>

              <button
                onClick={
                  saveEdit
                }
                disabled={
                  saving
                }
                className="rounded-xl bg-primary px-4 py-2 font-bold text-black"
              >
                {saving
                  ? "Saving..."
                  : "Save"}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}