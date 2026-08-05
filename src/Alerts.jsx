import Swal from "sweetalert2";
import toast from "react-hot-toast";

/** Escape a string for safe interpolation into HTML. */
const escapeHtml = (value) =>
  value.replace(/[&<>"']/g, (char) => {
    const entities = {
      "&": "&amp;",
      "<": "&lt;",
      ">": "&gt;",
      '"': "&quot;",
      "'": "&#39;",
    };
    return entities[char];
  });

/**
 * SweetAlert2 Confirm Delete Modal
 */
export const showDeleteConfirm = ({
  title = "هل أنت متأكد؟",
  text = "تريد حذف هذه المهمة نهائياً",
  onConfirm,
  onCancel,
}) => {
  Swal.fire({
    title,
    text,
    icon: "warning",
    showCancelButton: true,
    confirmButtonColor: "#059669",
    cancelButtonColor: "#e11d48",
    confirmButtonText: "نعم، أحذفه!",
    cancelButtonText: "لا الغي",
    reverseButtons: true,
  }).then((result) => {
    if (result.isConfirmed) {
      showSuccessToast("تم حذف المهمة بنجاح");
      if (onConfirm) onConfirm();
    } else if (result.dismiss === Swal.DismissReason.cancel) {
      showErrorToast("تم إلغاء عملية الحذف");
      if (onCancel) onCancel();
    }
  });
};

/**
 * SweetAlert2 Edit Task Modal
 */
export const showEditTask = ({
  initialTitle = "",
  initialDetails = "",
  onConfirm,
}) => {
  Swal.fire({
    title: "تعديل المهمة",
    html: `
      <div style="display: flex; flex-direction: column; gap: 12px; margin-top: 10px;">
        <input
          id="swal-input1"
          class="swal2-input"
          placeholder="ادخل عنوان المهمة"
          value="${escapeHtml(initialTitle)}"
          style="margin: 0; width: 100%; box-sizing: border-box; font-family: inherit;"
        >
        <input
          id="swal-input2"
          class="swal2-input"
          placeholder="ادخل تفاصيل المهمة"
          value="${escapeHtml(initialDetails)}"
          style="margin: 0; width: 100%; box-sizing: border-box; font-family: inherit;"
        >
      </div>
    `,
    focusConfirm: false,
    showCancelButton: true,
    confirmButtonText: "تعديل",
    cancelButtonText: "الغاء",
    confirmButtonColor: "#059669",
    cancelButtonColor: "#e11d48",
    customClass: {
      popup: "custom-swal-popup",
    },
    preConfirm: () => {
      const title = document.getElementById("swal-input1").value.trim();
      const details = document.getElementById("swal-input2").value.trim();

      if (!title) {
        Swal.showValidationMessage("عنوان المهمة مطلوب!");
        return false;
      }
      return { title, details };
    },
  }).then((result) => {
    if (result.isConfirmed && result.value) {
      showSuccessToast("تم تعديل المهمة بنجاح");
      if (onConfirm) onConfirm(result.value);
    }
  });
};

/* ===================================================
   react-hot-toast Helpers
   =================================================== */

/**
 * Success Toast Notification
 * @param {string} message
 */
export const showSuccessToast = (message = "تمت العملية بنجاح!") => {
  toast.success(message);
};

/**
 * Error Toast Notification
 * @param {string} message
 */
export const showErrorToast = (message = "حدث خطأ ما!") => {
  toast.error(message);
};
